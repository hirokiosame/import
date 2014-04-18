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

```
$ ./import test/data1/baz.js | node
foo
bar
```