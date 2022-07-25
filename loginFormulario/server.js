//import express y definiciones
const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()


const PORT = 8080