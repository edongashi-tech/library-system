using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Feedback
    {
        public int MemberID { get; set; }
        public string MemberName { get; set; }
        public string FeedbackTitle { get; set; }
        public string FeedbackText { get; set; }
        public string Rating { get; set; }

    }
}
