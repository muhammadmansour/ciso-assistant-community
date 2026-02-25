const match = ((param) => {
  return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
    param
  );
});

export { match };
//# sourceMappingURL=uuid-CE4Eu474.js.map
