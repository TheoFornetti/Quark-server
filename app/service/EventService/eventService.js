const {
  FutureEvents,
} = require("../../controller/EventsController/eventController");
const {
  events,
  participant,
  eventTags,
  tag,
  sequelize,
} = require("../../models/index");
const { Op } = require("sequelize");
const uploadGenaralImg = require("../../controller/imgController/generalImg");

async function createEvent(event, img) {
  try {
    const imgUrl = await uploadGenaralImg(img, "none");
    var rta = await events.create({
      title: event.title,
      speaker: event.speaker,
      description: event.description,
      eventDate: event.eventDate,
      link: event.link,
      state: +event.state,
      visibility: +event.visibility,
      isSaved: +event.isSaved,
      img: imgUrl,
    });

    /*if (event.eventTags.length != 0) {
      event.eventTags.forEach(async (tag) => {
        console.log(tag);
        await eventTags.create({
          eventId: rta.id,
          tagId: +tag,
        });
      });
    }*/
    return rta;
  } catch (err) {
    console.log(err);
  }
}

async function createEvenSuscription(professionalProfileId, event) {
  try {
    var rta = await events.create({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate,
      link: event.link,
      state: event.state,
      visibility: event.visibility,
      isSaved: event.isSaved,
    });
    await participant.create({
      professionalProfileId,
      eventId: rta.id,
    });
  } catch (err) {
    throw err;
  }
}

async function updateEvent(event, img) {
  try {
    const eventToUpdate = await events.findByPk(event.eventid);
    const imgUrl = await uploadGenaralImg(img, eventToUpdate.img);
    await events.update(
      {
        title: event.title,
        description: event.description,
        eventDate: event.eventDate,
        link: event.link,
        state: event.state,
        visibility: event.visibility,
        isSaved: event.isSaved,
        img: imgUrl,
      },
      { where: { id: event.eventid } }
    );
  } catch (err) {
    return err;
  }

  /*await eventTags.destroy({ where: { eventId: id } });

    if (event.eventTags.length != 0 ) {
      event.eventTags.forEach(async (tag) => {
        console.log(tag);
        await eventTags.create({
          eventId: id,
          tagId: tag,
        });
      });
    }*/
}

async function deleteEvent(id) {
  try {
    await events.destroy({ where: { id } });
  } catch (err) {
    throw err;
  }
}

async function getClosestEvent() {
  var actualDate = new Date();
  let options = {
    limit: 1,
    offset: 0 * 2,
    where: {
      eventDate: {
        [Op.gte]: actualDate,
      },
      visibility: {
        [Op.eq]: 0,
      },
    },
    order: sequelize.literal("eventDate ASC"),
  };

  var { count, rows } = await events.findAndCountAll(options);

  var closestEventsObject = {
    count,
  };

  return rows[0];
}

async function getFutureEvents(page, userId) {
  var row = [];
  var participantList = await participant.findAll({
    where: { professionalProfileId: userId },
  });
  var actualDate = new Date();
  let options = {
    limit: 3,
    offset: +page * 3,
    where: {
      eventDate: {
        [Op.gte]: actualDate,
      },
      visibility: {
        [Op.eq]: 0,
      },
    },
    order: sequelize.literal("eventDate ASC"),
  };

  var { count, rows } = await events.findAndCountAll(options);

  if (participantList.length != 0) {
    rows.forEach((event) => {
      var found = participantList.findIndex((p) => p.eventId == event.id);

      if (found == -1) {
        row.push(event);
      }
    });
  } else {
    rows.forEach((event) => {
      console.log(event.id)
      row.push(event);
    });
  }


  var futureEventsObject = {
    count,
    row,
  };

  return futureEventsObject;
}

async function getPastEvents(page) {
  const actualDate = new Date();

  let options = {
    limit: 6,
    offset: +page * 6,
    where: {
      eventDate: {
        [Op.lt]: actualDate,
      },
      visibility: {
        [Op.eq]: 0,
      },
      isSaved: {
        [Op.eq]: 1,
      },
    },
  };

  var { count, rows } = await events.findAndCountAll(options);

  var pastEventsObject = {
    count,
    rows,
  };

  return pastEventsObject;
}

async function getAllEvents(size, page) {
  let options = {
    limit: +size,
    offset: +page * +size,
    include: [{ model: eventTags, include: [tag] }],
    order: sequelize.literal("updatedAt DESC"),
  };

  const { count, rows } = await events.findAndCountAll(options);

  var page = {
    count,
    rows,
  };

  return page;
}

async function filterEvents(tagsId, dates) {
  try {
    var eventList = [];
    var filteredEvents = [];
    var filteredDateEvents = [];
    var rta = await eventTags.findAll();

    rta.forEach((event) => {
      tagsId.forEach((tagId) => {
        if (tagId == event.tagId) {
          eventList.push(event.eventId);
        }
      });
    });

    let unicos = new Set(eventList);
    let arrayUnicos = [...unicos];

    for (var i = 0; i < arrayUnicos.length; i++) {
      var event = await events.findByPk(arrayUnicos[i]);
      filteredEvents.push(event);
      console.log(i);
    }

    if (dates != undefined) {
      filteredEvents.forEach((eventos) => {
        var eventDate = new Date(eventos.eventDate);
        var date1 = new Date(dates.firstDate);
        var date2 = new Date(dates.lastDate);

        if (
          (eventDate >= date1 && eventDate < date2) ||
          (eventDate > date1 && eventDate <= date2)
        ) {
          filteredDateEvents.push(eventos);
        }
      });
      return filteredDateEvents;
    } else {
      return filteredEvents;
    }
  } catch (err) {
    return err;
  }
}

async function getAllEventsParticipants() {
  var participantList = await participant.findAll();
  return participantList;
}

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getFutureEvents,
  getPastEvents,
  getAllEvents,
  filterEvents,
  getClosestEvent,
  getAllEventsParticipants,
};
