import React from 'react';
import { connect } from 'react-redux';

function ExamList(props) {
    const exams = props.exams.exams && props.exams.exams.length > 0 && props.exams.exams.map((item) => {
        return (
            <tr key={item._id + item.examCode} onClick={() => { console.log("clicked") }}>
                <th scope="row">{item.examName}</th>
                <td>{item.examCode}</td>
                <td>{item.isClosed ? "❌" : "✅"}</td>
                <td>DELETE</td>
            </tr>
        )
    });

    return (
        <table className="table table-hover">
            <thead className="thead">
                <tr>
                    <th scope="col">Exam</th>
                    <th scope="col">Exam Code</th>
                    <th scope="col">Open</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {exams}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => {
    return {
        exams: state.exams
    };
};

/*
const mapDispatchToProps = dispatch => {
    return {
    }
}
*/

export default connect(mapStateToProps, null)(ExamList);