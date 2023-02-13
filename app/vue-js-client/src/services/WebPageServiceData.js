import http from "../http-common";

class WebPageServiceData {
  getAll() {
    return http.get("/webPage");
  }

  getAllbyUserID(userid) {
    return http.get(`/webPage/all/${userid}`);
  }

  getAllHistory() {
    return http.get("/webPage/history");
  }
  getAllHistorybyUserID(userid) {
    return http.get(`/webPage/history/${userid}`);
  }

  get(id) {
    return http.get(`/webPage/${id}`);
  }

  create(data) {
    return http.post("/webPage", data);
  }

  update(id, data) {
    return http.put(`/webPage/${id}`, data);
  }

  delete(id) {
    return http.delete(`/webPage/${id}`);
  }

  deleteAll() {
    return http.delete(`/webPage`);
  }
  deleteAllbyUserID(userid)
  {
    return http.delete(`/webPage/all/remove/${userid}`);
  }
  findByUrl(url) {
    return http.get(`/webPage?url=${url}`);
  }
}

export default new WebPageServiceData();