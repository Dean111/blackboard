var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
var fs = require("fs")
var mkdirp = require('mkdirp');


var compile = require("./fiddle.compile.js")
var n = 0

var dirs = {

}
io.on('connection', function(socket){
	n ++ 
	console.log(n + " clients connected")
	socket.on("draw", function(msg) {
		var dir = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic)
		if(!dirs[dir]) {
			dirs[dir] = true
			mkdirp.sync(dir)
		}
		
		var file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + ".log")

		delete msg.course
		delete msg.topic
		delete msg.id
		delete msg.type
		
		
		fs.appendFile(file, JSON.stringify(msg) + "\n")

	})

	socket.on("clear", function(msg) {

		try{
			var file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + ".log")
			fs.unlinkSync(file);	
			fs.close()
		} catch(e) {
			
		}
		
	})
	
	socket.on('save-widget', function(msg){
		var dir = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic)
		if(!dirs[dir]) {
			dirs[dir] = true
			mkdirp.sync(dir)
		}

		var file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + ".widget")

		fs.writeFileSync(file, JSON.stringify(msg.widgets))
	})


	socket.on('delete-widget', function(msg){
		var file = null
		console.log(msg)
		if(msg.widget.type === "markdown"){
			file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + "_" + msg.widget.id + ".md")
		}else if(msg.widget.type === "code") {
			file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + "_" + msg.widget.id + ".js")
		}
		console.log(file)
		fs.unlinkSync(file);	
	})
	socket.on('save-markdown', function(msg){
		
		var dir = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic)
		if(!dirs[dir]) {
			dirs[dir] = true
			mkdirp.sync(dir)
		}

		var file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + "_" + msg.widget.id + ".md")
		fs.writeFileSync(file, msg.markdown)
	})
	
	socket.on("save", function(msg) {

		console.log('msg=compile')
		var dir = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic)
		if(!dirs[dir]) {
			dirs[dir] = true
			mkdirp.sync(dir)
		}

		var file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + "_" + msg.widget.id + ".js")

		fs.writeFileSync(file, msg.content + "\n")

	})

	socket.on("compile", function(msg) {
		console.log('msg=compile')

		try{
			var file = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic, msg.id + "_" + msg.widget.id + ".js")
			var dir = path.resolve(__dirname, "dist/courses/", msg.course, msg.topic)
			var output = msg.id + "_" + msg.widget.id + ".bundle.js"


			if(!fs.existsSync(file)) {
				return
			}


			compile(file, dir, output, function(errors){

				if(errors && errors.length > 0) {
					socket.emit("compile-error", errors[0])
				}
				socket.emit("compile-succ")
			})

			// fs.unlinkSync(file);
			// fs.close()
		} catch(e) {

		}

	})
	socket.on("disconnect", function() {
		n--
		console.log(n + " clients connected")
	});
});

http.listen(3006, function(){
});
