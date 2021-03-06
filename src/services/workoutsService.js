import moment from 'moment';

export const segregateWorkoutsByMonth = (workouts) => {
  const result = [];
  const keyFormat = 'MMMM, YYYY';

  if (!workouts.length) {
    return result;
  }

  let currentMonth = {
    key: moment(workouts[0].date).format(keyFormat),
    workouts: []
  };

  for (const workout of workouts) {
    const workoutMonth = moment(workout.date).format(keyFormat);

    if (currentMonth.key === workoutMonth) {
      currentMonth.workouts.push(workout);
    } else {
      result.push(currentMonth);

      currentMonth = {
        key: workoutMonth,
        workouts: [
          workout
        ]
      };
    }
  }

  result.push(currentMonth);

  return result;
};

export const getChartData = (workoutsAnalysis) => {

  const result = {
    rows: [],
    columns: [
      {
        type: 'date',
        label: 'Date'
      },
      {
        type: 'number',
        label: 'Volume'
      }
    ]
  };

  if (workoutsAnalysis.length === 0) {
    result.rows.push([new Date('2017-01-01'), 0]);
  } else {
    for (const item of workoutsAnalysis) {
      item[0] = new Date(item[0]);
      result.rows.push(item);
    }
  }

  return result;
};

export const orderWorkoutsByDate = (workouts) => {
  const result = [];

  for (const workout of Object.values(workouts)) {
    result.push({
      ...workout
    });
  }

  result.sort((a, b) => {
    return moment(b.date).unix() - moment(a.date).unix();
  });

  return result;
}

export const getLastDate = (workouts) => {
  let lastDateUnix = moment().unix();

  for (const workout of Object.values(workouts)) {
    const unix = moment(workout.date).unix();
    if (unix <= lastDateUnix) {
      lastDateUnix = unix;
    }
  }

  return moment.unix(lastDateUnix).format('YYYY-MM-DD');
}
