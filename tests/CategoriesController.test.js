process.env.NODE_ENV = "test";
const HttpMock = require("node-mocks-http");
const CategoriesController = require("../controllers/CategoriesController");

describe("Categories Controller", () => {
  const CategoryService = {
    update: jest.fn(),
    delete: jest.fn()
  };

  const categoriesController = new CategoriesController({
    CategoryService
  });

  describe("Update a category", () => {
    it("should return the updated category object", async () => {
      const category = {
        id: 1,
        name: "Transportation"
      };
      const expectedResponse = Object.assign({}, category, { limit: 200 });

      const request = HttpMock.createRequest({
        method: "PATCH",
        body: category
      });
      const response = HttpMock.createResponse();

      CategoryService.update.mockReturnValueOnce(
        Promise.resolve(expectedResponse)
      );

      await categoriesController.updateCategoryById(request, response);

      const actualResponse = JSON.parse(response._getData());

      expect(actualResponse).toEqual(expectedResponse);
    });
    it("should respond with 400 when bad request is sent", async () => {
      const category = {
        name: "Transportation"
      };

      const request = HttpMock.createRequest({
        method: "POST",
        params: { categoryid: 1 },
        body: category
      });
      const response = HttpMock.createResponse();

      CategoryService.update.mockReturnValueOnce(Promise.reject("Bad Request"));

      await categoriesController.updateCategoryById(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should respond with 403 when bad auth", async () => {
      const category = {
        name: "Transportation"
      };

      const request = HttpMock.createRequest({
        method: "POST",
        params: { categoryid: 1 },
        body: category
      });
      const response = HttpMock.createResponse();

      CategoryService.update.mockReturnValueOnce(Promise.reject("Forbidden"));

      await categoriesController.updateCategoryById(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
  describe("Delete a Category", () => {
    it("should return 200 on successful delete", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { categoryid: 1 }
      });
      const response = HttpMock.createResponse();

      CategoryService.delete.mockReturnValueOnce(Promise.resolve());

      await categoriesController.deleteCategoryById(request, response);

      expect(response._getStatusCode()).toBe(200);
    });
    it("should return a 400 status code if bad request", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { userid: "one" }
      });
      const response = HttpMock.createResponse();

      CategoryService.delete.mockReturnValueOnce(Promise.reject("Bad Request"));

      await categoriesController.deleteCategoryById(request, response);

      expect(response._getStatusCode()).toBe(400);
    });
    it("should return a 403 status code if forbidden", async () => {
      const request = HttpMock.createRequest({
        method: "DELETE",
        params: { userid: "1" }
      });
      const response = HttpMock.createResponse();

      CategoryService.delete.mockReturnValueOnce(Promise.reject("Forbidden"));

      await categoriesController.deleteCategoryById(request, response);

      expect(response._getStatusCode()).toBe(403);
    });
  });
});
