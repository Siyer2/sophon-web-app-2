import React from 'react';

function StudentList(props) {
    const exams = false && props.exams.exams && props.exams.exams.length > 0 && props.exams.exams.map((item) => {
        return (
            <tr key={item._id + item.examCode}>
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
                    <th scope="col">Student ID</th>
                    <th scope="col">Exam Code</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">Download Submission</th>
                </tr>
            </thead>
            <tbody>
                {exams}
            </tbody>
        </table>
    )
}

export default StudentList;