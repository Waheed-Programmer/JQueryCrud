using JqueryCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JqueryCRUD.Controllers
{
    public class HomeController : Controller
    {
        UserDBEntities DB = new UserDBEntities();
     
       
        public ActionResult List()
        {
            var Data = DB.Users.ToList();
            return View(Data);
        }

        [HttpPost]
        public ActionResult Create(User u)
        {
            string message = "Saved Successfully";
            bool status = true;
            DB.Users.Add(u);
            DB.SaveChanges();
            return Json(new { status = status, message = message, id = DB.Users.Max(x => x.ID) }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int Id)
        {
            var del = DB.Users.Where(x => x.ID == Id).FirstOrDefault();
            DB.Users.Remove(del);
            DB.SaveChanges();
            string message = "Record has been deleted successfully.";
            bool status = true;
            return Json(new { status = status, message = message }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetUsers(int ID)
        {
            User data = new User();
            var getuser = DB.Users.Where(x => x.ID == ID).FirstOrDefault();
            data.ID = getuser.ID;
            data.Name = getuser.Name;
            data.Age = getuser.Age;
            data.Country = getuser.Country;
            data.State = getuser.State;

            return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Update(User model)
        {
            DB.Entry(model).State = System.Data.Entity.EntityState.Modified;
            DB.SaveChanges();
            string message = "Recored has been updated successfully";
            bool status = true;
            return Json(new { status = status, message = message }, JsonRequestBehavior.AllowGet);
        }

    }
}