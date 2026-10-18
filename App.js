import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';

const opcoes = ['Pedra', 'Papel', 'Tesoura'];
const emojis = { Pedra: '🪨', Papel: '📄', Tesoura: '✂️' };

export default class App extends Component {
  state = { jogador: 0, aplicativo: 0, empates: 0, rodada: 0, mensagem: 'Escolha sua jogada!', finalizado: false };

  jogar = (escolha) => {
    if (this.state.finalizado) return;
    const computador = opcoes[Math.floor(Math.random() * opcoes.length)];
    let jogador = this.state.jogador;
    let aplicativo = this.state.aplicativo;
    let empates = this.state.empates;
    let mensagem;

    if (escolha === computador) {
      empates += 1;
      mensagem = `Empate! Os dois escolheram ${escolha}.`;
    } else if (
      (escolha === 'Pedra' && computador === 'Tesoura') ||
      (escolha === 'Papel' && computador === 'Pedra') ||
      (escolha === 'Tesoura' && computador === 'Papel')
    ) {
      jogador += 1;
      mensagem = `Você ganhou! ${escolha} vence ${computador}.`;
    } else {
      aplicativo += 1;
      mensagem = `Você perdeu! ${computador} vence ${escolha}.`;
    }

    const rodada = this.state.rodada + 1;
    const finalizado = rodada >= 5 || jogador >= 3 || aplicativo >= 3;
    if (finalizado) {
      if (jogador > aplicativo) mensagem += ' Você venceu a disputa!';
      else if (aplicativo > jogador) mensagem += ' O aplicativo venceu a disputa!';
      else mensagem += ' A disputa terminou empatada.';
    }
    this.setState({ jogador, aplicativo, empates, rodada, mensagem, finalizado });
  };

  reiniciar = () => this.setState({ jogador: 0, aplicativo: 0, empates: 0, rodada: 0, mensagem: 'Escolha sua jogada!', finalizado: false });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Pedra, Papel ou Tesoura</Text>
        <Text style={styles.subtitulo}>Melhor de 5 rodadas</Text>
        <View style={styles.placar}>
          <View style={styles.ponto}><Text style={styles.pontoNumero}>{this.state.jogador}</Text><Text style={styles.pontoLabel}>Você</Text></View>
          <Text style={styles.versus}>×</Text>
          <View style={styles.ponto}><Text style={styles.pontoNumero}>{this.state.aplicativo}</Text><Text style={styles.pontoLabel}>App</Text></View>
        </View>
        <Text style={styles.rodada}>Rodada: {this.state.rodada}/5  •  Empates: {this.state.empates}</Text>
        <Text style={styles.mensagem}>{this.state.mensagem}</Text>
        <View style={styles.botoes}>
          {opcoes.map((opcao) => (
            <Pressable key={opcao} style={({ pressed }) => [styles.botao, pressed && { opacity: 0.7 }]} onPress={() => this.jogar(opcao)} disabled={this.state.finalizado}>
              <Text style={styles.emoji}>{emojis[opcao]}</Text><Text style={styles.textoBotao}>{opcao}</Text>
            </Pressable>
          ))}
        </View>
        {this.state.finalizado && <Pressable style={styles.reiniciar} onPress={this.reiniciar}><Text style={styles.textoReiniciar}>Jogar novamente</Text></Pressable>}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { color: '#9ca3af', marginTop: 8, fontSize: 16 },
  placar: { flexDirection: 'row', alignItems: 'center', marginVertical: 28, gap: 28 },
  ponto: { alignItems: 'center', backgroundColor: '#1f2937', borderRadius: 18, padding: 22, minWidth: 100 },
  pontoNumero: { color: '#38bdf8', fontSize: 42, fontWeight: 'bold' },
  pontoLabel: { color: '#fff', fontSize: 16 },
  versus: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  rodada: { color: '#fbbf24', fontSize: 16, marginBottom: 18 },
  mensagem: { color: '#fff', textAlign: 'center', minHeight: 52, fontSize: 17, marginBottom: 18 },
  botoes: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  botao: { backgroundColor: '#e5e7eb', borderRadius: 14, padding: 15, alignItems: 'center', minWidth: 95 },
  emoji: { fontSize: 30 },
  textoBotao: { color: '#111827', fontWeight: 'bold', marginTop: 5 },
  reiniciar: { backgroundColor: '#22c55e', borderRadius: 12, padding: 15, marginTop: 20 },
  textoReiniciar: { color: '#052e16', fontWeight: 'bold' },
});
