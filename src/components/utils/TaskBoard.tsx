import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiCalendar, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: string;
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20'
};

const statusColumns = [
  { id: 'todo', title: 'To Do', icon: FiClock },
  { id: 'in-progress', title: 'In Progress', icon: FiAlertCircle },
  { id: 'completed', title: 'Completed', icon: FiCheckCircle }
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implementar autenticación',
      description: 'Agregar sistema de login con JWT',
      priority: 'high',
      dueDate: '2024-02-20',
      status: 'todo',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Diseñar dashboard',
      description: 'Crear wireframes y mockups',
      priority: 'medium',
      dueDate: '2024-02-22',
      status: 'in-progress',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Optimizar queries',
      description: 'Mejorar rendimiento de la base de datos',
      priority: 'low',
      dueDate: '2024-02-25',
      status: 'completed',
      createdAt: new Date().toISOString()
    }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    status: 'todo'
  });

  const addTask = () => {
    if (newTask.title && newTask.description) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority as 'low' | 'medium' | 'high',
        dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
        status: newTask.status as 'todo' | 'in-progress' | 'completed',
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'todo'
      });
      setIsAddingTask(false);
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Task Board</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingTask(true)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-colors"
          >
            <FiPlus />
            Add Task
          </motion.button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {statusColumns.map(column => (
            <div key={column.id} className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4 text-emerald-300">
                <column.icon />
                <h3 className="font-medium">{column.title}</h3>
                <span className="text-sm bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  {tasks.filter(task => task.status === column.id).length}
                </span>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 space-y-4">
                <AnimatePresence>
                  {tasks
                    .filter(task => task.status === column.id)
                    .map(task => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 cursor-move"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1.5 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
                              onClick={() => deleteTask(task.id)}
                            >
                              <FiTrash2 className="text-emerald-300" size={16} />
                            </motion.button>
                          </div>
                        </div>
                        <p className="text-sm text-emerald-100/80 mb-3">
                          {task.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-lg text-xs ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-300">
                              <FiCalendar size={14} />
                              {task.dueDate}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {column.id !== 'todo' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'todo')}
                                className="text-xs px-2 py-1 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
                              >
                                To Do
                              </button>
                            )}
                            {column.id !== 'in-progress' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'in-progress')}
                                className="text-xs px-2 py-1 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
                              >
                                In Progress
                              </button>
                            )}
                            {column.id !== 'completed' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'completed')}
                                className="text-xs px-2 py-1 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsAddingTask(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-teal-800 to-emerald-800 rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add New Task</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-emerald-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 bg-black/20 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Task title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-emerald-300 mb-1">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 bg-black/20 border border-emerald-500/30 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Task description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-emerald-300 mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={e => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full px-3 py-2 bg-black/20 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-emerald-300 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-black/20 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddingTask(false)}
                    className="px-4 py-2 bg-emerald-500/20 text-white rounded-xl hover:bg-emerald-500/30 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addTask}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                  >
                    Add Task
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskBoard;
