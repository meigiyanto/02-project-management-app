import type { ActivityLog } from '../types';

const ActivityLog = ({ activities }: { activities: ActivityLog[] }) => {
  return (
    <section className="panel">
      <h2>Activity log</h2>
      <ul className="activity-list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-item">
            <p>
              <strong>{activity.actor}</strong> {activity.action}
            </p>
            <time>{activity.createdAt}</time>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActivityLog;
