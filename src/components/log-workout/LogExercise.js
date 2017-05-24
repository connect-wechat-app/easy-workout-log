import React from 'react';
import {connect} from 'react-redux';

import userActions from '../../core/actions/userActions';

import './log-exercise.css';

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkoutExerciseDelete: (index) => {
      dispatch(userActions.logWorkoutExerciseDelete(index));
    },
    doLogWorkoutExerciseSetData: (index, exercise) => {
      dispatch(userActions.logWorkoutExerciseSetData(index, exercise));
    }
  };
};

const LogExercise = (props) => {

  const handleExerciseDelete = (event) => {
    event.preventDefault();
    props.doLogWorkoutExerciseDelete(props.index);
  };

  const handleExerciseNameChange = (event) => {
    props.doLogWorkoutExerciseSetData(props.index, {
      name: event.target.value,
      reps: props.reps,
      weight: props.weight,
      sets: props.sets
    });
  }

  const displayDeleteButton = () => {
    return (
      <button
        className="btn btn-action btn-lg circle btn-exercise-action"
        onClick={handleExerciseDelete}>
        <i className="icon icon-delete"></i>
      </button>
    );
  };

  return (
    <div>
      <div className="divider"></div>

      <div className="exercise-entry">
        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Exercise</label>
          </div>
          <div className="col-7">
            <input
              className="form-input input-lg"
              type="text"
              placeholder="Squats"
              value={props.exercise.name}
              onChange={handleExerciseNameChange}/>
          </div>
          <div className="col-2 text-center">
            {displayDeleteButton()}
          </div>
        </div>

        <div
          className={"form-group form-input-hint" + (props.exercise.nameFormHint
          ? ''
          : 'hide')}>
          <div className="col-3"></div>
          <div className="col-9">
            {props.exercise.nameFormHint}
          </div>
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Reps</label>
          </div>
          <div className="col-3">
            <input className="form-input input-lg" type="text" placeholder="8"/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Weight</label>
          </div>
          <div className="col-3">
            <input className="form-input input-lg" type="text" placeholder="100"/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Sets</label>
          </div>
          <div className="col-3">
            <input className="form-input input-lg" type="text" placeholder="3"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LogExercise);
