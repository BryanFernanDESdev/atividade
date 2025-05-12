<script>
    import TaskList from './TaskList.svelte';
    import TaskForm from './TaskForm.svelte';
    let taskAdded = false;
  
    const handleTaskAdded = () => {
      taskAdded = !taskAdded; // para forçar atualização da lista
    };
  </script>
  
  <main>
    <h1>Gerenciador de Tarefas</h1>
    <TaskForm on:taskAdded={handleTaskAdded} />
    <TaskList {taskAdded} />
  </main>
  