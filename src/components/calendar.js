import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBookings} from '../actions';
import moment from 'moment';
import { each, map, filter, times } from 'lodash';

class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: props.startDate || moment().startOf('week'), // start date of the current display
      availableRoomTypes: [],
      selectedRoomType: undefined,
    };
  }

  componentWillMount() {
    this.props.getBookings();
  }

  componentWillReceiveProps(nextProps){

    // modify if the start date is modified from outside
    if (nextProps.startDate != this.props.startDate) {
      this.setState({startDate: nextProps.startDate});
    }

    // changes the booking data
    if (nextProps.bookings !== this.props.bookings) {
      const availableRoomTypes = [];

      // Get all room types
      // TODO: replace by _.uniq,
      each(nextProps.bookings, (room) => {
        if (availableRoomTypes.indexOf(room.roomType) === -1) {
          availableRoomTypes.push(room.roomType);
        }
      });

      this.setState({
        availableRoomTypes,
      });
    }
  }

  getDataRow = (data, className = '') => {
    return (<span className={`cell data-cell ${className}`}>{data}</span>)
  };

  showNextSet = () => {
    this.setState({
      startDate: moment(this.state.startDate).add(this.props.duration, 'd'),
    })
  };

  showPrevSet = () => {
    this.setState({
      startDate: moment(this.state.startDate).subtract(this.props.duration, 'd'),
    })
  };

  changeRoomType = (event) => {
    const val = event.target.value === 'all' ? undefined : event.target.value;
    this.setState({selectedRoomType: val});
  }

  renderNavigation = () => {
    return (<div>
            <span className="navigation-btn prev" onClick={this.showPrevSet}> {'<'} </span>
            <span className="navigation-btn next" onClick={this.showNextSet}> {'>'} </span>
            <span className="navigation-roomtype">
              <select onChange={this.changeRoomType}>
              <option key='all' value={'all'}>All Types</option>)
                {
                  map(this.state.availableRoomTypes, (type) => (<option key={type} value={type}>{type}</option>))
                }
              </select>
            </span>
            <span className="navigation-duration">
              {this.state.startDate.format(this.props.format)} - {moment(this.state.startDate).add(this.props.duration - 1, 'd').format(this.props.format)}
            </span>
          </div>);
  };

  getHeaderCell = (data = ' ') => {
    return (<span key={data} className="cell header">{data}</span>)
  };

  renderCalendarHeader = () => {

    // construct dates for header
    const tableHeaders = [];
    for(let i = 0; i < this.props.duration; i++ ) {
      let currentDate = moment(this.state.startDate).add(i, 'd');
      tableHeaders.push(this.getHeaderCell(currentDate.format('DD MMM')));
    }

    return (<div className="calendar-header">
            {this.getHeaderCell(this.state.selectedRoomType || 'All')}
            {tableHeaders}
          </div>)
  }

  renderBookingDetails = () => {
    const rows = [];

    // loop of room
    each(this.props.allRooms, (roomNo) => {
      // filter bookins for current room no.
      const roomBookings = filter(this.props.bookings, (room) =>  room.roomNumber === roomNo.toString() &&
                                                                    (!this.state.selectedRoomType || room.roomType === this.state.selectedRoomType));

      //prepare booking data table for each column
      const roomDataRow = [];
      times(this.props.duration, (currentDurationOffset) => {
        let currentDate = moment(this.state.startDate).add(currentDurationOffset, 'd');

        // find all occupancies that fall for the current column
        let isOccupied = false;
        for(let bookingIndex = 0; (bookingIndex < roomBookings.length && isOccupied === false); bookingIndex++) {
          const currentOccupancy = roomBookings[bookingIndex];
          const checkIn = moment(currentOccupancy.checkIn, this.props.format);
          const checkOut = moment(currentOccupancy.checkOut, this.props.format);
          isOccupied = currentDate.isBetween(checkIn-1, checkOut+1);
        }
        // push cell data
        roomDataRow.push(
                         <div className="cell data-cell">
                           <span key={`${roomNo}_${currentDate.format('DDMMM')}`} className={`occupancy ${isOccupied ? 'occupied' : ''}`}> {isOccupied ? 'Booked' : '_'} </span>
                         </div>);
      });

      // push each row data
      rows.push(<div key={roomNo}>
        {this.getDataRow(roomNo, 'row-head')}
        {roomDataRow}
      </div>);
    });

    return rows;
  }

  render() {
    return(
      <div>
        <div className="calendar">
          {this.renderNavigation()}
          {this.renderCalendarHeader()}
          {this.renderBookingDetails()}
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { bookings: state.bookings.all};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getBookings}, dispatch);
}

Calendar.defaultProps = {
  format: 'DD-MM-YYYY',
  startDate: moment('01-01-2017', 'DD-MM-YYYY'),
  duration: 7, // duration to be displayed at a time in days
  allRooms: [1, 2, 3, 4, 5, 6], // all rooms that needs to be displayed
};
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
