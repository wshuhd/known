/**
 * 节流
 * 每次调用前，会check是否需要等待
 * 需要等待，直接返回，并且记录下当前入参
 * 不需要等待,直接执行, 并且设置  是否需要等待状态为=是
 * 只有计时器时间到了,  才会重置  是否需要等待状态为=否
 * @param {*} cb 
 * @param {*} delay 
 * @returns 
 */
function throttle(cb, delay) {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs)
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }
    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        shouldWait = true;
        cb(...args);
        setTimeout(timeoutFunc, delay);
    }

}