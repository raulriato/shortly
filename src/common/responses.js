function serverErrorResponse(res, error) {
    console.error(error);
    return res.sendStatus(500);
};

function unprocessableResponse(res, messages) {
    return res.status(422).send(messages);
};

function conflictResponse(res, body) {
    return res.status(409).send(body);
};

function unauthorizedResponse(res, body) {
    return res.status(401).send(body);
};

function notFoundResponse(res, body) {
    return res.status(404).send(body);
};

function createdResponse(res, body) {
    return res.status(201).send(body);
};

function okResponse(res, body) {
    return res.status(200).send(body);
};

export {
    serverErrorResponse,
    unprocessableResponse,
    conflictResponse,
    unauthorizedResponse,
    notFoundResponse,
    createdResponse,
    okResponse
}