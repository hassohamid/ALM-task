const { User, Accommodation } = require("../test-setup");

describe("Accommodation Model", () => {
  it("should create an accommodation", async () => {
    const user = await User.create({
      username: "hostuser",
      email: "host@example.com",
      profilePicture: "https://example.com/pic.jpg",
    });

    const accommodation = await Accommodation.create({
      address: "Main Street 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 10000,
      rooms: 3,
      userId: user.id,
    });

    expect(accommodation).toBeDefined();
    expect(accommodation.city).toBe("Stockholm");
    expect(accommodation.userId).toBe(user.id);
  });

  it("should delete accommodations when user is deleted (CASCADE)", async () => {
    const user = await User.create({
      username: "cascadeuser",
      email: "cascade@example.com",
      profilePicture: "https://example.com/pic.jpg",
    });

    await Accommodation.create({
      address: "Cascade St 5",
      city: "Gothenburg",
      country: "Sweden",
      postalCode: "54321",
      rent: 8000,
      rooms: 2,
      userId: user.id,
    });

    await user.destroy();

    const accommodations = await Accommodation.findAll({
      where: { userId: user.id },
    });
    expect(accommodations).toHaveLength(0);
  });
});
