<script>
    import { onMount } from 'svelte';
    export let taskAdded;
    let tasks = [];
  
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:3000/tasks');
      tasks = await res.json();
    };
  
    $: taskAdded, fetchTasks();
  
    onMount(fetchTasks);
  
    const deleteTask = async (id) => {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });
      fetchTasks();
    };
  
    const completeTask = async (id) => {
      await fetch(`http://localhost:3000/tasks/${id}/complete`, {
        method: 'PATCH',
      });
      fetchTasks();
    };
  
    const incompleteTask = async (id) => {
      await fetch(`http://localhost:3000/tasks/${id}/incomplete`, {
        method: 'PATCH',
      });
      fetchTasks();
    };
  </script>
  
  <h2>Lista de Tarefas</h2>
  <ul>
    {#each tasks as task}
      <li>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <button on:click={() => completeTask(task.id)} disabled={task.status === 'done'}>
          Marcar como concluída
        </button>
        <button on:click={() => incompleteTask(task.id)} disabled={task.status === 'pending'}>
          Desmarcar como concluída
        </button>
        <button on:click={() => deleteTask(task.id)}>Excluir</button>
      </li>
    {/each}
  </ul>
  