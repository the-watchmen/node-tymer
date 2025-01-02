# node-tymer

time stuff

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![build status](https://github.com/the-watchmen/node-tymer/actions/workflows/release.yaml/badge.svg)](https://github.com/the-watchmen/node-tymer/actions)
[![npm (scoped)](https://img.shields.io/npm/v/@watchmen/tymer.svg)](https://img.shields.io/npm/v/@watchmen/tymer.svg)

## usage

- `npm i <package name>`

### import

```
import Timer from '@watchmen/tymer'
```

### stop

```
// timer is automatically started on construction
//
const timer = new Timer('some-event')

// some event occurs here

timer.stop()
```

### explicit start

```
const timer = new Timer('some-event')

const array = [1, 2, 3]
for (let i = 0; i < array.length; i++) {
  timer.start()
  // do stuff
  timer.stop()
}
```

### lap

```
const timer = new Timer('some-event')

// some event occurs here

timer.lap() // lap() stops and then immediately starts

// other event here

timer.stop()
```

### async

```
const parentTimer = new Timer('some-event')

something().then(()=>{
  const childTimer = new Timer()
  // some event
  childTimer.stop()
  // need child timer to track time spent in async segment
  parentTimer.record(childTimer.last())
})
```

### report

```
console.log('timer: report=%o', timer.toString())
```

```
some-event: count=1, min=0.014, max=0.048, max2=0.031, last=0.015, avg=0.026, avg2=0.021, total=0.000s
```

> `max2` is the second max, and `avg2` is the average without the max.

> this is to provide insight into loops where the first call incurs an initialization cost.
