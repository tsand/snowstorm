# snowstorm

[![npm version](https://img.shields.io/npm/v/snowstorm)](https://www.npmjs.com/package/snowstorm)
[![Node.js Build](https://github.com/tsand/snowstorm/workflows/Node.js%20Build/badge.svg)](https://github.com/tsand/snowstorm/actions)

Simple Javascript ORM


## :snowflake: Getting Started

### Installation

`npm install snowstorm`

### Example

Create a model and define the properties of the model

```js
var snowstorm = require('snowstorm');

// Define the model and its properties
var Task = snowstorm.create('Task', {
	title: snowstorm.Properties.string,
	completed: snowstorm.Properties.boolean,
	createdAt: snowstorm.Properties.date('created_at')
});
```

Add methods to the prototype layer

```js
Task.prototype.isCompleted = function () {
	return this.completed;
};
```

Create an instance of a task

```js
// Data from server
var responseData = {
	title: 'Task out the trash',
	completed: false,
	created_at: '2015-08-20T10:00:00.000Z'
};
var task = new Task(responseData);
```

Access the properties/methods of the task or convert to JSON to send back to the server

```js
console.log(task.title);          // Task out the trash
console.log(task.createdAt);      // Thu Aug 20 2015 04:00:00 GMT-0600 (MDT)
console.log(task.isCompleted());  // false

// Send back to server
var requestData = task.toJSON();
```


## :snowflake: API

**Create a model class**

```js
snowstorm.create(name, properties);
```

---

**Define a property to be used on the model**

```js
snowstorm.Properties.string
// or
snowstorm.Properties.string(attr, [arguments])
```

| Properties                     | Arguments            |
| ------------------------------ | -------------------- |
| `snowstorm.Properties.string`  | `attr`               |
| `snowstorm.Properties.number`  | `attr`               |
| `snowstorm.Properties.boolean` | `attr`               |
| `snowstorm.Properties.array`   | `attr`               |
| `snowstorm.Properties.object`  | `attr`               |
| `snowstorm.Properties.date`    | `attr`, `format`     |
| `snowstorm.Properties.model`   | `attr`, `modelClass` |

---

**Create a custom property**

```js
var Moment = require('moment'); // https://github.com/moment/moment/

function moment (attr) {
	return {
		attr: attr,
		construct: function (d) {
			if (typeof d === 'undefined') {
				return null;
			}
			return Moment(d);
		},
		destruct: function (d) {
            if (!d) {
                return null;
            }
		    return d.toISOString();
		}
	}
};

// Usage
var Todo = snowstorm.create('Task', {
	dueAt: moment
});
```


## :snowflake: Running tests

`npm install`

`npm test`
