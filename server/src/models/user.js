'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    name: String,
    id: String
});

// 使用模式“编译”模型
const UserModel = mongoose.model('UserModel', UserModelSchema);

mongoose.model('User', UserModel);