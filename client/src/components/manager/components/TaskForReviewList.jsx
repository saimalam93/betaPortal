import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import { Button, ThemeProvider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Avatar, CardHeader } from '@material-ui/core';
import Theme from '../../Theme'


function createData(name, task, state) {
    return { name, task, state };
}

const rows = [
    createData('Jack Husein', 'Created task Landing Page  ', 'Todo'),
    createData('Deano Amor', 'Edit task Landing Page  ', 'Doing'),
    createData('Marie Siray', 'Sleep all day', 'Done'),
    createData('Jaka Laguna', 'Work as fuck', 'Todo'),
    createData('Erfisien Nota', 'I like my job', 'Done'),
];

const avatars = [1, 2, 3, 4];

export default function TaskForReviewList() {

    return (
        <Card>
            <Typography variant="subtitle1" component="body1"> Tasks waiting for review</Typography>
            <TableContainer>
                <Table >
                    <TableBody>
                        {rows.map((row, count) => (
                            <TableRow hover={true} style={{ fontSize: '4rem', color: 'Theme.text.primary' }} key={row.name}>
                                <TableCell component="th" scope="row">
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                src={`/assets/images/avatar${count}.png`} key={count}
                                            />
                                        }
                                        title={row.name}
                                    />
                                </TableCell>
                                <TableCell >{row.task}</TableCell>
                                <TableCell>
                                <Button className='state-btn'
                                 disableElevation variant="contained" style=
          {{

            ...(row.status === 'Doing' && {
              color: '#832525',
              backgroundColor: '#FDECEC',
            }),
            ...(row.status === 'Todo' && {
              color: '#078A96',
              backgroundColor: '#EEF9FA',
            }),
            ...(row.status === 'Done' && {
              color: '#316B6E',
              backgroundColor: '#B4F3B0',
            }),
          }}
          >{row.state}</Button>
          </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>

    );
}