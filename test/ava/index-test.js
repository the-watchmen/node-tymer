import test from 'ava'
import Timer from '../../src'

test('timer: should track laps', t => {
	const timer = new Timer('some-event')
	timer.lap()
	timer.lap()
	timer.stop()
	t.is(timer.count(), 3)
	console.log(timer.toString())
})

test('timer: none', t => {
	const timer = new Timer('some-event')
	t.is(timer.count(), 0)
	t.is(timer.last(), undefined)
	t.is(timer.min(), undefined)
	t.is(timer.max(), 0)
	t.is(timer.max2(), 0)
	t.true(Number.isNaN(timer.avg()))
	t.true(Number.isNaN(timer.avg2()))
	t.is(timer.total(), 0)
})

test('timer: one', t => {
	const timer = new Timer('some-event')
	timer.record(1000)
	t.is(timer.count(), 1)
	t.is(timer.last(), 1000)
	t.is(timer.min(), 1000)
	t.is(timer.max(), 1000)
	t.is(timer.max2(), 0)
	t.is(timer.avg(), 1000)
	t.true(Number.isNaN(timer.avg2()))
	t.is(timer.total(), 1000)
})

test('timer: two', t => {
	const timer = new Timer('some-event')
	timer.record(3000)
	timer.record(1000)
	t.is(timer.count(), 2)
	t.is(timer.last(), 1000)
	t.is(timer.min(), 1000)
	t.is(timer.max(), 3000)
	t.is(timer.max2(), 1000)
	t.is(timer.avg(), 2000)
	t.is(timer.avg2(), 1000)
	t.is(timer.total(), 4000)
})

test('timer: three', t => {
	const timer = new Timer('some-event')
	timer.record(6000)
	timer.record(2000)
	timer.record(4000)
	t.is(timer.count(), 3)
	t.is(timer.last(), 4000)
	t.is(timer.min(), 2000)
	t.is(timer.max(), 6000)
	t.is(timer.max2(), 4000)
	t.is(timer.avg(), 4000)
	t.is(timer.avg2(), 3000)
	t.is(timer.total(), 12000)
	t.is(timer.metrics().count, 3)
})

test('timer: should record with parent', t => {
	const timer = new Timer('some-event')
	for (let i = 0; i < 10; i++) {
		const child = new Timer()
		timer.record(child.stop())
	}

	t.is(timer.count(), 10)
})
