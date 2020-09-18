import React from 'react';
import Categories from './Categories';
import { setFaculties } from '../../../../actions/faculties';
import { connect } from 'react-redux';


class CategoriesContainer extends React.Component{
    componentDidMount() {
        this.props.setFaculties();
    }


    render(){
        return <Categories faculties={ this.props.faculties } />
    }
}

const mapStateToProps = (state) => {
    return{
        faculties: state.categoriesBlock.faculties
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setFaculties: (facultyName) => {
            dispatch(setFaculties(facultyName));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CategoriesContainer);
