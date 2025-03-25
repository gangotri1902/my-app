import React, { useState, useEffect } from 'react';  // Import React and hooks (useState, useEffect)
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'; // Import core components
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local data storage

const App = () => {
  const [tasks, setTasks] = useState([]);  // State to store tasks
  const [taskText, setTaskText] = useState('');  // State to store input field text

  // Load tasks from AsyncStorage when the app starts
  useEffect(() => {
    loadTasks();
  }, []);

  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks'); // Get stored tasks
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));  // Convert string data to an array and set state
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  // Function to save tasks to AsyncStorage
  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks)); // Convert array to string and store
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Function to add a new task
  const addTask = () => {
    if (taskText.trim() === '') return;  // Ignore empty input
    const newTasks = [...tasks, { id: Date.now(), text: taskText, completed: false }]; // Create a new task object
    setTasks(newTasks);  // Update state with new task list
    saveTasks(newTasks);  // Save updated task list
    setTaskText('');  // Clear input field
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ); // Toggle completed status
    setTasks(updatedTasks); // Update state
    saveTasks(updatedTasks); // Save updated tasks
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId); // Remove the selected task
    setTasks(filteredTasks); // Update state
    saveTasks(filteredTasks); // Save updated task list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      
      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={taskText}
        onChangeText={setTaskText} // Update state as user types
      />
      
      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      
      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()} // Convert ID to string for the key
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// **Styling**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    color: 'red',
    fontSize: 18,
  },
});

export default App;
