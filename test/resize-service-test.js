/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

describe('[images-resizer][resize-service]', function () {
    var service;
    var $rootScope;

    beforeEach(module('images-resizer'));
    beforeEach(inject(function ($injector) {
        service = $injector.get('resizeService');
        $rootScope = $injector.get('$rootScope');
    }));

    describe('- createImage -', function () {
        it('should return a JS image', function (done) {
            service
                .createImage('base/fixture/img.jpg')
                .then(function (image) {
                    expect(image).to.be.not.null;
                    done();
                })
                .catch(function () {
                    done('fail');
                });

            setTimeout(function () {
                $rootScope.$digest();
            }, 1000);
        });

        it('should add a crossOrigin parameter', function (done) {
            service
                .createImage('base/fixture/img.jpg', 'Anonymous')
                .then(function (image) {
                    expect(image.crossOrigin).to.equal('Anonymous');
                    done();
                })
                .catch(function () {
                    done('fail');
                });

            setTimeout(function () {
                $rootScope.$digest();
            }, 1000);
        });
    });

    describe('- resizeImageWidthHeight -', function () {
        it('should return a base64 image with an jpg image in entry with same size', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
                service.createImage(data)
                    .then(function (image) {
                        expect(image).to.be.not.null;
                        done();
                    })
                    .catch(function () {
                        done('fail');
                    });

                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            };

            img.src = 'base/fixture/img.jpg';
        });

        it('should return a base64 image with specific height', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img, null, 300);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
                service.createImage(data)
                    .then(function (image) {
                        expect(image).to.be.not.null;
                        expect(image.height).to.be.equal(300);
                        done();
                    })
                    .catch(function () {
                        done('fail');
                    });

                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            };

            img.src = 'base/fixture/img.jpg';
        });

        it('should return a base64 image with specific width', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img, 300, null, 2);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
                service.createImage(data)
                    .then(function (image) {
                        expect(image).to.be.not.null;
                        expect(image.width).to.be.equal(300);
                        done();
                    })
                    .catch(function () {
                        done('fail');
                    });

                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            };

            img.src = 'base/fixture/img.jpg';
        });

        it('should return a base64 image with specific height and width', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img, 300, 300, 2);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
                service.createImage(data)
                    .then(function (image) {
                        expect(image).to.be.not.null;
                        expect(image.width).to.be.equal(300);
                        expect(image.height).to.be.equal(300);
                        done();
                    })
                    .catch(function () {
                        done('fail');
                    });

                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            };

            img.src = 'base/fixture/img.jpg';
        });

        it('should return a base64 image with specific height and width to png format', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img, 300, 300, 2, 'image/png');

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/png;base64');
                //check size of the returned image
                service.createImage(data)
                    .then(function (image) {
                        expect(image).to.be.not.null;
                        expect(image.width).to.be.equal(300);
                        expect(image.height).to.be.equal(300);
                        done();
                    })
                    .catch(function () {
                        done('fail');
                    });

                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            };

            img.src = 'base/fixture/img.jpg';
        });
    });

    describe('- resizeImageBySize -', function () {
        it('should return a base64 img with a lower size than specified in the option', function (done) {
            var img = new Image();
            img.onload = function () {
                //When i wrote this test, the test image = 8.3Ko
                var data = service.resizeImageBySize(img, 5000);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check the size of the returned image
                expect(Math.round(data.length - 'data:image/jpeg;base64,'.length) * 3 / 4).to.be.below(6000);
                done();
            };

            img.src = 'base/fixture/img.jpg';
        });

        it('should throw error when no image is specified', function () {
            /*expect(function () {
                service.resizeImageBySize();
            }).toThrow('No image provided');*/
        });
    });

    describe('- resizeImage -', function () {
        it('should return nothing when there is no param send', function (done) {
            service
                .resizeImage()
                .then(function () { done('fail'); })
                .catch(function (err) {
                    expect(err).to.equal('Missing argument when calling resizeImage function');
                    done();
                });

            $rootScope.$digest();
        });

        it('should fire an error when there is missing options', function (done) {
            service
                .resizeImage('base/fixture/img.jpg', null)
                .then(function () { done('fail'); })
                .catch(function (err) {
                    expect(err).to.equal('Missing argument when calling resizeImage function');
                    done();
                });

            $rootScope.$digest();
        });

        it('should return a base64 img with no error when no specific option is specified', function (done) {
            service
                .resizeImage('base/fixture/img.jpg', {})
                .then(function (data) {
                    expect(data).to.be.not.null;
                    expect(data).to.contain('data:image/jpeg;base64');
                    done();
                })
                .catch(function () { done('fail'); });

            setTimeout(function () {
                $rootScope.$digest();
                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            }, 500);
        });

        it('should return a base64 img according to the size given in bytes', function (done) {

            service
                .resizeImage('base/fixture/img.jpg', {size: 5000, sizeScale: 'b'})
                .then(function (data) {
                    expect(data).to.be.not.null;
                    expect(data).to.contain('data:image/jpeg;base64');
                    //check the size of the returned image
                    expect(Math.round(data.length - 'data:image/jpeg;base64,'.length) * 3 / 4).to.be.below(6000);
                    done();
                })
                .catch(function () { done('fail'); });

            setTimeout(function () {
                $rootScope.$digest();
                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            }, 500);
        });

        it('should return a base64 img according to the size given in KB', function (done) {
            var sizeInKb = 5000 / 1024;

            service
                .resizeImage('base/fixture/img.jpg', {size: sizeInKb, sizeScale: 'kb'})
                .then(function (data) {
                    expect(data).to.be.not.null;
                    expect(data).to.contain('data:image/jpeg;base64');
                    //check the size of the returned image
                    expect(Math.round(data.length - 'data:image/jpeg;base64,'.length) * 3 / 4).to.be.below(6000);
                    done();
                })
                .catch(function () { done('fail'); });

            setTimeout(function () {
                $rootScope.$digest();
                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            }, 500);
        });

        it('should return a base64 img according to the size given in MB', function (done) {
            var sizeInMb = 5000 / (1024 * 1024);

            service.resizeImage('base/fixture/img.jpg', {size: sizeInMb, sizeScale: 'mb'})
                .then(function (data) {
                    expect(data).to.be.not.null;
                    expect(data).to.contain('data:image/jpeg;base64');
                    //check the size of the returned image
                    expect(Math.round(data.length - 'data:image/jpeg;base64,'.length) * 3 / 4).to.be.below(6000);
                    done();
                })
                .catch(function () { done('fail'); });

            setTimeout(function () {
                $rootScope.$digest();
                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            }, 500);
        });

        it('should return a base64 img according to the size given in GB', function (done) {
            var sizeInGb = 5000 / (1024 * 1024 * 1024);

            service
                .resizeImage('base/fixture/img.jpg', {size: sizeInGb, sizeScale: 'gb'})
                .then(function (data) {
                    expect(data).to.be.not.null;
                    expect(data).to.contain('data:image/jpeg;base64');
                    //check the size of the returned image
                    expect(Math.round(data.length - 'data:image/jpeg;base64,'.length) * 3 / 4).to.be.below(6000);
                    done();
                })
                .catch(function () { done('fail'); });

            setTimeout(function () {
                $rootScope.$digest();
                setTimeout(function () {
                    $rootScope.$digest();
                }, 500);
            }, 500);
        });
    });

    describe('- calulateImageSize -', function () {
        it('should return the size of the img for a jpg image', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img, null, null, null, 'image/jpeg');
                expect(service.calulateImageSize(data)).to.be.equal(58218);
                done();
            };
            img.src = 'base/fixture/img.png';

            setTimeout(function () {
                $rootScope.$digest();
            }, 500);
        });

        it('should return the size of the img for a png image', function (done) {
            var img = new Image();
            img.onload = function () {
                var data = service.resizeImageWidthHeight(img, null, null, null, 'image/png');
                expect(service.calulateImageSize(data, 'image/png')).to.be.equal(398604);
                done();
            };
            img.src = 'base/fixture/img.png';

            setTimeout(function () {
                $rootScope.$digest();
            }, 500);
        });

        it('should return 0 when the img is empty', function () {
            expect(service.calulateImageSize('', 'image/png')).to.be.equal(0);
        });
    });
});
