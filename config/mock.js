const _players = [];
for (let i = 1; i < 20; i++) {
  _players.push({
    name: `Player ${i}`,
    email: `${i}@gmail.com`,
    password: "123456",
    elo: (i + 7) * 100
  });
}

export const players = _players;
