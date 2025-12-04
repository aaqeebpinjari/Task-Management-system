import { format, isPast, isToday } from 'date-fns'

const TaskCard = ({ task, onEdit, onDelete }) => {
  const deadline = new Date(task.deadline)
  const isOverdue = isPast(deadline) && task.status !== 'Done'
  const isDueToday = isToday(deadline) && task.status !== 'Done'

  // Status badge colors.
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Done': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-200 ${
      isOverdue ? 'border-red-500 dark:border-red-500' : ''
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
          {task.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : isDueToday ? 'text-orange-600 dark:text-orange-400 font-medium' : ''}>
            {format(deadline, 'MMM dd, yyyy HH:mm')}
          </span>
        </div>
        {isOverdue && (
          <span className="text-xs text-red-600 dark:text-red-400 font-medium">
            Overdue
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="btn-secondary flex-1 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn-danger flex-1 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
export default TaskCard

