function animation(obj) {
    const { clear, update, render } = obj;
    let pTimestamp = 0;
    requestAnimationFrame(tick);
    function tick(timestamp) {
        animid = requestAnimationFrame(tick);
        const diff = timestamp - pTimestamp;
        pTimestamp = timestamp;
        const fps = Math.round(1000 / diff);
        params = {
            diff,
            pTimestamp,
            timestamp,
            fps,
            animid
        }

        update(params);
        clear();
        render(params);
    }
}

function random (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}