const { User } = require("../test-setup");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
      profilePicture: "https://example.com/pic.jpg",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should not allow duplicate emails", async () => {
    await User.create({ username: "user1", email: "duplicate@test.com" });
    await expect(
      User.create({ username: "user2", email: "duplicate@test.com" })
    ).rejects.toThrow();
  });

  it("should not allow duplicate usernames", async () => {
    await User.create({ username: "sameuser", email: "usera@test.com" });
    await expect(
      User.create({ username: "sameuser", email: "userb@test.com" })
    ).rejects.toThrow();
  });

  it("should validate invalid email format", async () => {
    await expect(
      User.create({ username: "bademail", email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("should validate invalid profile picture URL", async () => {
    await expect(
      User.create({
        username: "badurl",
        email: "badurl@test.com",
        profilePicture: "not-a-url",
      })
    ).rejects.toThrow();
  });
});
