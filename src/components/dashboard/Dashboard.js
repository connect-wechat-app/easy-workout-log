import React, {Component} from 'react';
// import PropTypes from 'prop-types' import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import getChartData from '../../services/workoutsAnalysisChartService';

import DateVsWeightScatterChart from '../generic/DateVsWeightScatterChart';
import WorkoutView from './WorkoutView';
import UserNotificationBar from '../notification/UserNotificationBar';
import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    // ...ownProps,
    dashboard: state.user.dashboard,
    workouts: state.user.workouts.workouts,
    workoutsViewDetails: state.user.workouts.workoutsViewDetails,
    workoutsAnalysis: state.user.workouts.workoutsAnalysis
  };
};

const mapDispatchToProps = {
  doFetchUserWorkoutsThunk: userWorkoutsActions.fetchUserWorkoutsThunk,
  doFetchUserWorkoutsAnalysisThunk: userWorkoutsActions.fetchUserWorkoutsAnalysisThunk,
  doDeleteUserWorkoutThunk: userWorkoutsActions.deleteUserWorkoutThunk,
  doToggleViewWorkoutDetails: userWorkoutsActions.userWorkoutsSetViewDetails
};

class Dashboard extends Component {
  /*
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  */

  constructor(props) {
    super(props);

    const workoutsAnalysisChartData = getChartData(props.workoutsAnalysis);

    const state = {
      accordionShow: false,
      chartEvents: [
        {
          eventName: 'select',
          callback(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from
            // chart.wrapper
            console.log('Selected ', Chart.chart.getSelection());
          }
        }
      ],
      rows: workoutsAnalysisChartData.rows,
      columns: workoutsAnalysisChartData.columns
    };

    this.state = state;
  }

  componentDidMount() {
    this
      .props
      .doFetchUserWorkoutsThunk();
    this
      .props
      .doFetchUserWorkoutsAnalysisThunk();
  }

  componentWillReceiveProps(newProps) {
    // only update chart if something changed
    if (this.props.workoutsAnalysis !== newProps.workoutsAnalysis) {
      const workoutsAnalysisChartData = getChartData(newProps.workoutsAnalysis);
      const newState = this.state;
      newState.rows = workoutsAnalysisChartData.rows;
      this.setState(newState);
    }
  }

  render() {

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-960 section-content">
          <div className="columns">
            <div className="column col-12">
              <h4>Progress</h4>
              <DateVsWeightScatterChart
                rows={this.state.rows}
                columns={this.state.columns}
                chartEvents={this.state.chartEvents}/>
            </div>
          </div>
          <div className="columns">
            <div className="column col-12">
              <h4>Workouts</h4>
              <p>
                Click on a workout to toggle details.
              </p>
              <p>
                Tempo (default 101) and Rest (default 60) are only displayed if not default
                values.
              </p>
            </div>
            <div className="accordion width-100">
              {this.renderWorkouts()}
            </div>
          </div>
          <div className="columns">
            <div className="column col-12 text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={this.handleBtnLogWorkoutClick}>Log a new workout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderWorkouts() {

    if (this.props.workouts.length === 0) {
      return (
        <div className="columns col-12">
          <div className="empty width-100">
            <div className="empty-icon">
              <i className="icon icon-flag"></i>
            </div>
            <h4 className="empty-title">You have no workouts logged</h4>
            <p className="empty-subtitle">Click the button to log a new workout</p>
            <div className="empty-action">
              <button className="btn btn-primary" onClick={this.handleBtnLogWorkoutClick}>Log Workout</button>
            </div>
          </div>
        </div>
      );
    }

    return this
      .props
      .workouts
      .map((workout) => {
        return (<WorkoutView
          key={workout.id}
          workout={workout}
          showWorkoutDetails={this.props.workoutsViewDetails[workout.id]
          ? true
          : false}
          doDeleteUserWorkoutThunk={this.props.doDeleteUserWorkoutThunk}
          doToggleViewWorkoutDetails={this.props.doToggleViewWorkoutDetails}/>);
      });
  }

  handleBtnLogWorkoutClick = (event) => {
    event.preventDefault();
    this
      .props
      .history
      .push('/log-workout');
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
