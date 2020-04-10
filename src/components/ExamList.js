import React from 'react';

function ExamList(props) {
    const exams = props.todos && props.todos.length > 0 && props.todos.map((item) => {
        return (
            <tr key={item.id + item.text} onClick={() => { props.onTodoClick(item.id) }}>
                <th scope="row">{item.id}</th>
                <td>{item.text}</td>
                <td>{item.completed.toString()}</td>
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

export default ExamList;