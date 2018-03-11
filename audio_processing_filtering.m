% plot data
D = load('proxy.wav');
s = D.val';
Fs = 20;                                                % Sampling Frequency (Hz)
Fn = Fs/2;                                              % Nyquist Frequency (Hz)
Wp = [0.34 1.00]/Fn;                                    % Passband Frequencies (Normalised)
Ws = [0.30 1.05]/Fn;                                    % Stopband Frequencies (Normalised)
Rp = 10;                                                % Passband Ripple (dB)
Rs = 50;                                                % Stopband Ripple (dB)
[n,Ws] = cheb2ord(Wp,Ws,Rp,Rs);                         % Filter Order
[z,p,k] = cheby2(n,Rs,Ws);                              % Filter Design
[sosbp,gbp] = zp2sos(z,p,k);                            % Convert To Second-Order-Section For 
figure(1)
freqz(sosbp, 2^16, Fs)                                  % Filter Bode Plot
tv = linspace(0, 1, length(s))/Fs;                      % Time Vector (s)
s_filt = filtfilt(sosbp,gbp, s);                        % Filter Signal
figure(2)
plot(tv, s_filt)
grid