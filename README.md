# Imprort

Temporary solution to inline importing front-end Javascript for modular development.

More lightweight than [smash](https://github.com/mbostock/smash). Has tabulation support.


foo.js
```
function foo(){
	return "foo";
}
```

bar.js
```
function bar(){
	console.log("bar");
}
```

baz.js
```
import "foo";

function baz(){
	console.log(foo());
	return import "bar";
}
baz()();
```

***

See final output
```
$ ./import test/data1/baz.js
function foo(){
	return "foo";
}

function baz(){
	console.log(foo());
	return function bar(){
		console.log("bar");
	}
}
baz()();
```

Create an output file
```
$ ./import test/data1/baz.js > test/data1/out.js
```

Execute in Node
```
$ ./import test/data1/baz.js | node
foo
bar
```