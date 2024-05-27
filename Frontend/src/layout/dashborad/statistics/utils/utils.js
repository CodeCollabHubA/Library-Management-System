export const statusToAction = {
    "Admin": {
        "Pending": [
            { name: "Reject", color: "Rejected" },
            { name: "Approve", color: "Approved" },
        ],
        "Borrowed": [
            { name: "Return", color: "Returned" },
        ],
        "Approved": [
            { name: "Reject", color: "Rejected" },
        ]
    },
    "User": {
        "Pending": [
            { name: "Cancel", color: "Canceled" },
        ],
        "Approved": [
            { name: "Confirm", color: "Confirmed" },
        ]
    }
}