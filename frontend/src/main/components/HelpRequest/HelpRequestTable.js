import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/helpRequestUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function HelpRequestsTable({ helpRequests, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/helprequests/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/helprequests/all"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }
    
    // const tempData = [
    //     {
    //       "id": 1,
    //       "requesterEmail": "a",
    //       "teamId": "team4",
    //       "tableOrBreakoutRoom": "Table",
    //       "requestTime": "2023-11-08T14:05:00",
    //       "explanation": "help",
    //       "solved": true
    //     },
    //     {
    //       "id": 2,
    //       "requesterEmail": "jonathancheng@umail.ucsb.edu",
    //       "teamId": "team04",
    //       "tableOrBreakoutRoom": "Table",
    //       "requestTime": "2023-11-08T02:07:00",
    //       "explanation": "Help",
    //       "solved": false
    //     }
    //   ]

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        // {
        //     Header: 'RequesterEmail',
        //     accessor: 'requesterEmail',
        // },
        // {
        //     Header: 'TeamId',
        //     accessor: 'teamId',
        // },
        // {
        //     Header: 'TableOrBreakoutRoom',
        //     accessor: 'tableOrBreakoutRoom',
        // },
        // {
        //     Header: 'RequestTime',
        //     accessor: 'requestTime',
        // },
        // {
        //     Header: 'Explanation',
        //     accessor: 'explanation',
        // },
        // {
        //     Header: 'Solved',
        //     accessor: (row, _rowIndex) => String(row.solved),
        //     // accessor: 'solved',
        // }
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, "HelpRequestsTable"));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, "HelpRequestsTable"));
    } 

    return <OurTable
        data={helpRequests}
        columns={columns}
        testid={"HelpRequestsTable"}
    />;
};