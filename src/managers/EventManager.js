export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}

export const getEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
};

export const updateEvent = (id, event) => {
    return fetch(`http://localhost:8000/events/${id}`, {
    method: "PUT",
    headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
    })
};

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        }
    })
};


export const leaveEvent = eventId => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        }
    })
  }
  
  export const joinEvent = eventId => {
      // TODO: Write the POST fetch request to join and event
      return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(eventId)
    })
        .then(res => res.json())
  }