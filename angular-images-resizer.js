"use strict";angular.module("resize",[]).service("resizeService",["$q",function($q){var mainCanvas,_this=this;this.createImage=function(src){var deferred=$q.defer(),img=new Image;return img.onload=function(){deferred.resolve(img)},img.src=src,deferred.promise},this.startResize=function(src,cb){_this.createImage(src).then(function(img){cb(null,_this.resize(img))},function(err){cb(err,null)})},this.resize=function(image){for(mainCanvas=document.createElement("canvas"),mainCanvas.width=image.width,mainCanvas.height=image.height,mainCanvas.getContext("2d").drawImage(image,0,0,mainCanvas.width,mainCanvas.height);mainCanvas.width>480;)mainCanvas=_this.halfSize(mainCanvas);return mainCanvas.toDataURL("image/jpeg")},this.halfSize=function(i){var canvas=document.createElement("canvas");return canvas.width=i.width/2,canvas.height=i.height/2,canvas.getContext("2d").drawImage(i,0,0,canvas.width,canvas.height),canvas}}]),angular.module("resize",[]),angular.module("resize").service("readLocalPicService",["$q",function($q){function eventErrorDecoder(event){var errorMessage=null;switch(event.target.error.code){case FileError.NOT_FOUND_ERR:errorMessage="NOT_FOUND_ERR";break;case FileError.SECURITY_ERR:errorMessage="SECURITY_ERR";break;case FileError.ABORT_ERR:errorMessage="ABORT_ERR";break;case FileError.NOT_READABLE_ERR:errorMessage="NOT_READABLE_ERR";break;case FileError.ENCODING_ERR:errorMessage="ENCODING_ERR";break;case FileError.NO_MODIFICATION_ALLOWED_ERR:errorMessage="NO_MODIFICATION_ALLOWED_ERR";break;case FileError.INVALID_STATE_ERR:errorMessage="INVALID_STATE_ERR";break;case FileError.SYNTAX_ERR:errorMessage="SYNTAX_ERR";break;case FileError.INVALID_MODIFICATION_ERR:errorMessage="INVALID_MODIFICATION_ERR";break;case FileError.QUOTA_EXCEEDED_ERR:errorMessage="QUOTA_EXCEEDED_ERR";break;case FileError.TYPE_MISMATCH_ERR:errorMessage="TYPE_MISMATCH_ERR";break;case FileError.PATH_EXISTS_ERR:errorMessage="PATH_EXISTS_ERR";break;default:errorMessage="Unknown Error: "+event.target.error.code}return errorMessage}this.readFileInput=function(input){var deferred=$q.defer();if(input.files&&input.files[0]){window.File&&window.FileReader&&window.FileList&&window.Blob||deferred.reject("Your browser do not support reading file");var reader=new FileReader;reader.onload=function(e){deferred.resolve(e.target.result)},reader.onabort=function(e){deferred.reject("Fail to convert file in base64img, aborded: "+eventErrorDecoder(e))},reader.onerror=function(e){deferred.reject("Fail to convert file in base64img, error: "+eventErrorDecoder(e))},reader.readAsDataURL(input.files[0])}else deferred.reject("No file selected");return deferred.promise}}]);