let {Timer} = require('../build/tMinus');

describe('creating a Timer instance (constructor fn)', () => {
    it('works as (time:string)', () => {
        const t = new Timer('4:30');
        expect(t.secs).toStrictEqual([30]);
        expect(t.mins).toStrictEqual([4]);

        const t2 = new Timer('1:30:23:59:60:300');
        expect([t2.years, t2.days, t2.hours, t2.mins, t2.secs, t2.mills])
            .toStrictEqual([[1],[31],[0],[0],[0],[300]]);
    });

    it('works as (time: string, timeUpFn: Function', () => {
        const t = new Timer('04', function(){});
        expect([t.years, t.days, t.hours, t.mins, t.secs, t.mills])
            .toStrictEqual([[0],[0],[0],[0],[4],[0]]);
        expect(typeof t.options.onTimeout).toEqual('function');
    });

    it('works as (time: string, timeUpFn: Function, intervalFn: Function', () => {
        const t = new Timer('4h33s10ms', function(){}, function(){});
        expect([t.years, t.days, t.hours, t.mins, t.secs, t.mills])
            .toStrictEqual([[0],[0],[4],[0],[33],[10]]);
        expect(typeof t.options.onInterval).toEqual('function');
        expect(typeof t.options.onTimeout).toEqual('function');
    });
    it('works as (time: string, options: object)', () => {
        const t = new Timer('1y', {
            onTimeout: function onTimeout(){},
            onInterval: function onInterval(){}
        });

        expect(t.years).toStrictEqual([1]);
        expect(t.options.onTimeout.name).toEqual('onTimeout');
        expect(t.options.onInterval.name).toEqual('onInterval');
    })
});

describe('Timer options', () => {

    it('delays tick if immediateInterval is false', () => {
        const timerDelay = new Timer('10', { immediateInterval: false });
        const timerStandard = new Timer('10');
        const spyDelay = jest.spyOn(timerDelay, 'tick');
        const spyStandard = jest.spyOn(timerStandard, 'tick')
        timerDelay.pause();

        expect(spyDelay).not.toHaveBeenCalled();
        expect(spyStandard).toHaveBeenCalled();
    });

    it('Repeats with repeat option', () => {
        let callTimes = 0;
        const timesUp = () => callTimes++;
        const timer = new Timer('3');
        timer.pause();
        timer.tick(); timer.tick(); timer.tick();
        expect(callTimes).toEqual(1);
        expect(timer.secs[0]).toEqual(3);
    });
});














