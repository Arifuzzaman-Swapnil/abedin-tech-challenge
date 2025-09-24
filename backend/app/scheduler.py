# app/scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import SessionLocal
from app import models


def publish_post(post_id: int):
    """ নির্দিষ্ট সময়ে পোস্ট পাবলিশ করার কাজ করবে (mock). """
    db: Session = SessionLocal()
    post = db.query(models.ScheduledPost).filter(
        models.ScheduledPost.id == post_id
    ).first()

    print(
        f"🔍 Job Started | PostID={post_id} | Scheduled={post.scheduled_time} | "
        f"Now={datetime.now(timezone.utc)}"
    )

    if post and post.status == "scheduled":
        # এখানে আসল API ইন্টিগ্রেশন হতো (Facebook, Twitter ইত্যাদি)
        # এখন শুধু mock publish করবো:
        post.status = "published"
        print(f"✅ Post {post.id} published at {datetime.utcnow()} !")
        db.commit()

    db.close()


# Scheduler instance
scheduler = BackgroundScheduler(timezone="UTC")
scheduler.start()


def schedule_post(post_id: int, run_date: datetime):
    """ Add job to scheduler """
    scheduler.add_job(
        publish_post,
        "date",             # একবার ফায়ার হবে
        run_date=run_date,
        args=[post_id],
        id=str(post_id),    # job ID
        replace_existing=True,
    )