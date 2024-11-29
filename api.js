/* Imports */
const express = require('express');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const Port = process.env.DB_PORT ?? 4000;
const url = 'https://rmrdjfyiwennhdwvoxci.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcmRqZnlpd2Vubmhkd3ZveGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4Njg0NzgsImV4cCI6MjA0ODQ0NDQ3OH0.vblnNmWR8kxsVGOaKO6VzwKt5ktdPUefDmDaRlqTnIU';

const app = express();
const supabase = createClient(url, key);

app.disable('x-powered-by');
app.use(express.json());

/* EndPoints */
app.get('/usuarios', async (req, res) => {

    try {
        let query = supabase.from('usuarios').select('*, usuario_recompensas(fecha_obtencion, recompensas(nombre,descripcion))');

        const { data: usuarios, error } = await query;

        if (error) {
            console.error('Error al realizar la consulta:', error);
            throw error;
        }

        res.json(usuarios);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/estaciones', async (req, res) => {

    try {
        let query = supabase.from('estaciones').select('*');

        const { data: estaciones, error } = await query;

        if (error) {
            console.error('Error al realizar la consulta:', error);
            throw error;
        }

        res.json(estaciones);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/mantenimientos', async (req, res) => {

    try {
        let query = supabase.from('mantenimientos').select('fecha, descripcion, usuarios(nombre,apellido), vehiculos(tipo)');

        const { data: mantenimientos, error } = await query;

        if (error) {
            console.error('Error al realizar la consulta:', error);
            throw error;
        }

        res.json(mantenimientos);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/viajes', async (req, res) => {

    try {
        let query = supabase.from('viajes').select('hora_inicio, hora_fin, costo, estado, usuarios(nombre, apellido), vehiculos(tipo)');

        const { data: viajes, error } = await query;

        if (error) {
            console.error('Error al realizar la consulta:', error);
            throw error;
        }

        res.json(viajes);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/vehiculos', async (req, res) => {

    try {
        let query = supabase.from('vehiculos').select('tipo , modelo , estado');

        const { data: vehiculos, error } = await query;

        if (error) {
            console.error('Error al realizar la consulta:', error);
            throw error;
        }

        res.json(vehiculos);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/transacciones', async (req, res) => {

    try {
        let query = supabase.from('transacciones').select('monto, fecha, usuarios(nombre, apellido), viajes(estado)');

        const { data: transacciones, error } = await query;

        if (error) {
            console.error('Error al realizar la consulta:', error);
            throw error;
        }

        res.json(transacciones);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
/* App Started */
app.listen(Port, () => console.log(`Servidor iniciado en el puerto ${Port}`));