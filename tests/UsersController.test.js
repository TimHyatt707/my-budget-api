process.env.NODE_ENV = "test";
const HttpMock = require("node-mocks-http");
const UsersController = require("../controllers/UsersController");

describe("Users Controller", () => {
  const userService = {
    getUserById: jest.fn(),
    getTransactionsByUser: jest.fn(),
    getCategoriesByUser: jest.fn(),
    createUser: jest.fn(),
    createTransaction: jest.fn(),
    createCategory: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
  };

  const usersController = new UsersController({ userService });

  describe("create User", () => {
    it("should respond with 200 and the created user", async () => {
      const userBody = {
        email: "coolemail@yahoo.com",
        password: "password",
        username: "something"
      };

      const expectedResponse = Object.assign({}, userBody, { id: 1 });

      const request = HttpMock.createRequest({
        method: "POST",
        body: userBody
      });
      const response = HttpMock.createResponse();

      userService.createUser.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await usersController.createUser(request, response, () => {});

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});
