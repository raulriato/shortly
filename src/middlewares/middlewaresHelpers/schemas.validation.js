function validateSchema (schema, values) {
    const validation = schema.validate(values);

    if (validation.error) {
        const messages = validation.error.details.map(detail => detail.message);
        return messages;
    };
};

export { validateSchema };