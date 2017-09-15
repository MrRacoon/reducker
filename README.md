reducker
========

Utility functions for channeling your inner duck and reducing [redux][redux]
boilerplate.


## Install

```shell
npm i --save reducker
```

## Usage

If you use [duck-typing][duck-typing] in redux, you'll quickly start to notice
that many action creators are just the same trivial boilerplate repeated over
and over again. We can reduce this boilerplate by encapsulating the common code.

```javascript
import { actions } from 'reducker';

const ADD_TODO = 'APP/TODO/ADD'
const addTodo = payload => ({ type: ADD_TODO, payload })
```

now becomes:

```javascript
import { actions } from 'reducker';

const ADD_TODO = 'APP/TODO/ADD'
const addTodo = action.payload(ADD_TODO);
```


[redux]: http://redux.js.org/
[duck-typing]: https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5
