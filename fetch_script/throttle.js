class TaskMaster {
  max = 10;
  counter = 0;

  resolvesQueue = [];

  waitForPermissionToRunTask() {
    return new Promise((resolve) => {
      if (this.counter >= this.max) {
        this.resolvesQueue.push(() => {
          this.counter++;
          resolve();
        });
      } else {
        this.counter++;
        resolve();
      }
    });
  }

  signalEndOfTask() {
    this.counter--;
    const resolve = this.resolvesQueue.shift();
    if (resolve) {
      resolve();
    }
  }
}

const taskMaster = new TaskMaster();

// Async utility.
//
// ('cb' is a function representing a long-running task
// which returns a Promise to indicate its completion)
//
// If you call this method several times in parallels,
// with different tasks, it will guarantee that these
// these tasks will not run in parallel too much
//
// It's like a global "chokepoint" where only X
// can go at a time
export async function throttle(cb) {
  await taskMaster.waitForPermissionToRunTask();
  const result = await cb();
  taskMaster.signalEndOfTask();
  return result;
}
