import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import ReactGA from 'react-ga';

import './log-workout.css';

import UserNotificationBar from '../notification/UserNotificationBar';
import LogExercise from './LogExercise';
import Modal from '../generic/Modal';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';

import ewoloContent from '../../common/ewoloContent';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout, exerciseNames: state.user.data.exerciseNames};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(logWorkoutActions.logWorkout());
    },
    doLogWorkoutExercise: (name, reps, weight, sets, tempo, rest, showAdvanced) => {
      dispatch(logWorkoutActions.logWorkoutExercise(name, reps, weight, sets, tempo, rest, showAdvanced));
    },
    doLogWorkoutSetData: (date, notes) => {
      dispatch(logWorkoutActions.logWorkoutSetData(date, notes));
    },
    doLogWorkoutSetShowTempoHelp: (showTempoHelp) => {
      dispatch(logWorkoutActions.logWorkoutSetShowTempoHelp(showTempoHelp));
    },
    doLogWorkoutSetShowRestHelp: (showRestHelp) => {
      dispatch(logWorkoutActions.logWorkoutSetShowRestHelp(showRestHelp));
    },
    doLogWorkoutSetShowWeightHelp: (showWeightHelp) => {
      dispatch(logWorkoutActions.logWorkoutSetShowWeightHelp(showWeightHelp));
    },
    doLogWorkoutSave: () => {
      dispatch(logWorkoutActions.logWorkoutSave());
    },
    doLogWorkoutExerciseDelete: (index) => {
      dispatch(logWorkoutActions.logWorkoutExerciseDelete(index));
    },
    doLogWorkoutExerciseSetData: (index, exercise) => {
      dispatch(logWorkoutActions.logWorkoutExerciseSetData(index, exercise));
    }
  };
};

class LogWorkout extends Component {

  componentDidMount() {
    if (!this.props.logWorkout.componentMounted) {
      // TODO: consider maintaining mount status in local state
      this
        .props
        .doLogWorkout();
      this
        .props
        .doLogWorkoutExercise();
    }
  }

  renderExercises() {
    return this
      .props
      .logWorkout
      .exercises
      .map((exercise, index) => {
        return (<LogExercise
          key={index}
          index={index}
          exercise={exercise}
          exerciseNames={this.props.exerciseNames}
          doLogWorkoutExerciseDelete={this.props.doLogWorkoutExerciseDelete}
          doLogWorkoutExerciseSetData={this.props.doLogWorkoutExerciseSetData}
          doLogWorkoutSetShowTempoHelp={this.props.doLogWorkoutSetShowTempoHelp}
          doLogWorkoutSetShowRestHelp={this.props.doLogWorkoutSetShowRestHelp}
          doLogWorkoutSetShowWeightHelp={this.props.doLogWorkoutSetShowWeightHelp}/>);
      });
  }

  // Stage 1 fat arrow class methods auto scope this!
  handleBtnAddExerciseClick = (event) => {
    event
      .currentTarget
      .blur(); // hide the tooltip

    const numExercises = this.props.logWorkout.exercises.length;

    if (numExercises) {
      const {
        name,
        reps,
        weight,
        sets,
        tempo,
        rest,
        showAdvanced
      } = this.props.logWorkout.exercises[numExercises - 1];

      this
        .props
        .doLogWorkoutExercise(name, reps, weight, sets, tempo, rest, showAdvanced);

      setTimeout(() => {
        ReactDOM
          .findDOMNode(this.refs.btnAddExercise)
          .scrollIntoView({block: 'end', behavior: 'smooth'});
      }, 0);

      return;
    }

    this
      .props
      .doLogWorkoutExercise();
  };

  handleDateChange = (event) => {
    this
      .props
      .doLogWorkoutSetData(event.target.value, this.props.logWorkout.notes);
  }

  handleNotesChange = (event) => {
    this
      .props
      .doLogWorkoutSetData(this.props.logWorkout.date, event.target.value);
  }

  handleSave = (event) => {
    event.preventDefault();
    this
      .props
      .doLogWorkoutSave();
  }

  render() {
    ReactGA.pageview('/log-workout');

    if (!this.props.logWorkout.componentMounted) {
      return <div></div>;
    }

    return (
      <div>
        <UserNotificationBar/>

        <Modal
          doSetShowModal={this.props.doLogWorkoutSetShowTempoHelp}
          showModal={this.props.logWorkout.showTempoHelp}
          size="sm"
          title="Tempo"
          content={ewoloContent.tempoHelpModalContent}/>

        <Modal
          doSetShowModal={this.props.doLogWorkoutSetShowRestHelp}
          showModal={this.props.logWorkout.showRestHelp}
          size="sm"
          title="Rest"
          content={ewoloContent.restHelpModalContent}/>

        <Modal
          doSetShowModal={this.props.doLogWorkoutSetShowWeightHelp}
          showModal={this.props.logWorkout.showWeightHelp}
          size="sm``"
          title="Weight"
          content={ewoloContent.weightHelpModalContent}/>

        <div className="container grid-480 section-content">
          <div className="columns">
            <div className="column col-12">
              <h4>Log a new workout.</h4>
              <p>
                Click + to add a new exercise. Use the same exercise name for multiple sets.
              </p>
              <p>
                Clickable labels provide hints.
              </p>
              <p>
                Hit the save button once finished.
              </p>
            </div>
          </div>

          <div className="columns">
            <div className="column col-12">

              <form className="form-horizontal">

                <div className="form-group">
                  <div className="col-3">
                    <label className="form-label">Date</label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-input"
                      type="date"
                      value={this.props.logWorkout.date}
                      onChange={this.handleDateChange}/>
                  </div>
                </div>
                <div
                  className={"form-group form-input-hint " + (this.props.logWorkout.dateFormHint
                  ? ''
                  : 'hide')}>
                  <div className="col-3"></div>
                  <div className="col-9">
                    {this.props.logWorkout.dateFormHint}
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-3">
                    <label className="form-label">Notes</label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. chest and legs"
                      value={this.props.logWorkout.notes}
                      onChange={this.handleNotesChange}/>
                  </div>

                </div>

                {this.renderExercises()}

                <div className="form-group">
                  <div className="col-10"></div>
                  <div className="col-2 text-center">
                    <button
                      ref="btnAddExercise"
                      className="btn btn-action btn-lg circle btn-exercise-action tooltip"
                      data-tooltip="Add exercise"
                      type="button"
                      onClick={this.handleBtnAddExerciseClick}>
                      <i className="icon icon-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-12 text-center">
                    <button
                      id="btn-save-workout"
                      className="btn btn-primary btn-lg"
                      onClick={this.handleSave}>
                      Save Workout
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkout);
