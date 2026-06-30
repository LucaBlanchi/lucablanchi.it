# Sharp Random Thresholds for Exact Ternary Homogeneous Boolean Lifts

## Abstract

We study exact interpolation of Boolean functions by expanded homogeneous integer forms in the standard \({0,1}\)-encoding. A homogeneous form
$$
F\in\mathbb{Z}[X_0,\dots,X_n]_d
$$
is evaluated on the Boolean cube by restricting to the affine chart \(X_0=1\). We require all homogeneous coefficients of (F) to lie in \({-1,0,1}\), and we ask for exact equality
$$
F(1,x)=g(x)
\qquad(x\in{0,1}^n).
$$

The evaluation map has an exact block structure: the number of homogeneous degree-(d) monomials collapsing to a Boolean monomial \(x_S\) is
$$
\binom d{|S|}.
$$
Consequently, an exact ternary homogeneous lift of degree (d) exists if and only if every Boolean Möbius coefficient satisfies
$$
|\mu_S(g)|\le \binom d{|S|}.
$$

For a uniformly random Boolean function
$$
G_n:{0,1}^n\to{-1,1},
$$
let (D_{\mathrm{ex},1}\(G_n\)) denote the least degree (d) for which an exact ternary homogeneous lift exists. We prove
$$
D_{\mathrm{ex},1}(G_n)
=
cn+
\frac{\log n}{2L}
+
\frac{\log\log n}{2L}
+
O_{\mathbb{P}}(1),
$$
where \(c>1\) is the unique solution of
$$
c\log c-(c-1)\log(c-1)=\frac12\log2,
$$
and
$$
L=\log\frac c{c-1}.
$$
Numerically,
$$
c=1.1048284166\ldots,
\qquad
\frac1{2L}=0.2123033677\ldots.
$$

The leading term and the \(\log n\) correction are forced by the top Boolean Möbius coefficient. The additional \(\log\log n\) correction is forced by the maximum of the (n) Möbius coefficients on the level (n-1). Thus the random exact-lift threshold is localized up to bounded fluctuations in probability.

The result concerns exact interpolation in a fixed expanded homogeneous integer presentation model. It is not a statement about ordinary polynomial threshold degree or about threshold sign-representation.

## 1. Introduction

Let
$$
G_n:{0,1}^n\to{-1,1}
$$
be uniformly random. We embed the Boolean cube into projective space by
$$
x=(x_1,\dots,x_n)\mapsto [1:x_1:\cdots:x_n]\in\mathbb{P}^n(\mathbb{Q}).
$$
A homogeneous form
$$
F\in\mathbb{Z}[X_0,\dots,X_n]_d
$$
is evaluated by
$$
x\mapsto F(1,x_1,\dots,x_n).
$$

This note studies exact interpolation by such forms under the coefficient alphabet constraint
$$
\operatorname{coeff}(F)\subseteq{-1,0,1}.
$$

The model is deliberately presentation-dependent. It is not invariant under arbitrary Boolean recodings. Its advantage is that it admits a precise block decomposition. Each Boolean monomial \(x_S\) receives contributions from exactly
$$
\binom d{|S|}
$$
homogeneous monomials of degree (d). Hence the exact ternary lift problem becomes a family of independent capacity constraints on the Boolean Möbius coefficients.

The main result is a sharp random threshold theorem:
$$
D_{\mathrm{ex},1}(G_n)
=
cn+
\frac{\log n}{2L}
+
\frac{\log\log n}{2L}
+
O_{\mathbb{P}}(1).
$$

The leading constant (c) is determined by the top coefficient scale. Indeed, (\mu_{[n]}\(G_n\)) has standard deviation \(2^{n/2}\), while
$$
\binom dn
\approx
\exp\bigl(n f(d/n)\bigr)n^{-1/2},
$$
where
$$
f(x)=x\log x-(x-1)\log(x-1).
$$
Balancing the exponential scales gives
$$
f(c)=\frac12\log2.
$$

The correction \(\frac{\log n}{2L}\) compensates for the Stirling factor \(n^{-1/2}\). The further correction \(\frac{\log\log n}{2L}\) is caused by the level (n-1): there are (n) Möbius coefficients on that level, and their maximum after normalization is of order \(\sqrt{\log n}\).

## 2. Boolean Möbius coefficients

For \(S\subseteq[n]\), write
$$
x_S=\prod_{i\in S}x_i,
\qquad x_\varnothing=1.
$$

For an integer-valued function
$$
v:{0,1}^n\to\mathbb{Z},
$$
define its Boolean Möbius coefficient by
$$
\mu_S(v)
=
\sum_{T\subseteq S}
(-1)^{|S|-|T|}v(1_T),
$$
where \(1_T\in{0,1}^n\) is the indicator vector of (T).

The unique multilinear representative of (v) is
$$
p_v(x)=\sum_{S\subseteq[n]}\mu_S(v)x_S.
$$

We use the convention
$$
\binom ds=0
\qquad(s>d).
$$

## 3. Homogeneous block decomposition

Lemma 3.1. Block size

Fix \(S\subseteq[n]\), \(|S|=s\). The number of homogeneous monomials of degree (d) in \(X_0,\dots,X_n\) which reduce to \(x_S\) after substituting \(X_0=1\) and using \(x_i^k=x_i\) on the Boolean cube is
$$
\binom ds.
$$

Proof

A monomial
$$
X_0^{\alpha_0}X_1^{\alpha_1}\cdots X_n^{\alpha_n}
$$
of total degree (d) reduces to \(x_S\) if and only if
$$
\alpha_i\ge1\quad(i\in S),
$$
$$
\alpha_j=0\quad(j\notin S,\ j\ge1),
$$
and
$$
\alpha_0+\sum_{i\in S}\alpha_i=d.
$$
Writing
$$
\beta_i=\alpha_i-1\qquad(i\in S),
$$
we count nonnegative solutions of
$$
\alpha_0+\sum_{i\in S}\beta_i=d-s.
$$
There are (s+1) variables, so the number of solutions is
$$
\binom{d}{s}.
$$
\(\square\)

## 4. Exact ternary lifts

Let
$$
g:{0,1}^n\to{-1,1}.
$$

Define (D_{\mathrm{ex},1}(g)) to be the least integer (d) such that there exists
$$
F\in\mathbb{Z}[X_0,\dots,X_n]_d
$$
with all homogeneous coefficients in \({-1,0,1}\), satisfying
$$
F(1,x)=g(x)
\qquad(x\in{0,1}^n).
$$

Lemma 4.1. Exact ternary lift criterion

There exists an exact homogeneous degree-(d) lift of (g) with coefficients in \({-1,0,1}\) if and only if
$$
|\mu_S(g)|\le \binom d{|S|}
\qquad
\forall S\subseteq[n].
$$

Consequently,
$$
D_{\mathrm{ex},1}(g)
=
\min\left\{
d:
|\mu_S(g)|\le \binom d{|S|}
\ \forall S\subseteq[n]
\right\}.
$$

Proof

By Lemma 3.1, the coefficient of \(x_S\) in the multilinear representative of (F(1,x)) is the sum of exactly \(\binom d{|S|}\) homogeneous coefficients. If each homogeneous coefficient lies in \({-1,0,1}\), then this sum can be any integer in
$$
\left[-\binom d{|S|},\binom d{|S|}\right].
$$
Since the coefficient of \(x_S\) in the multilinear representative of (g) is (\mu_S(g)), the displayed inequalities are necessary.

Conversely, if
$$
|\mu_S(g)|\le \binom d{|S|}
$$
for every (S), then in the block corresponding to (S) choose (|\mu_S(g)|) coefficients equal to (\operatorname{sgn}\mu_S(g)), and set the remaining coefficients in the block equal to (0). The blocks are disjoint, so these choices can be made independently for all (S). The resulting homogeneous form has coefficients in \({-1,0,1}\) and evaluates exactly to (g). \(\square\)

## 5. Random Möbius coefficients

Let
$$
G_n:{0,1}^n\to{-1,1}
$$
be uniformly random, with independent values.

For fixed (S), \(|S|=s\), the coefficient
$$
\mu_S(G_n)
=
\sum_{T\subseteq S}
(-1)^{s-|T|}G_n(1_T)
$$
is a sum of \(2^s\) independent Rademacher random variables. Hence
$$
\mathbb{E}\mu_S(G_n)=0,
\qquad
\operatorname{Var}(\mu_S(G_n))=2^s.
$$

Define the normalized capacity
$$
R_s(d)=\frac{\binom ds}{2^{s/2}}.
$$

Hoeffding's inequality gives
$$
\mathbb{P}\left(
|\mu_S(G_n)|>\binom ds
\right)
\le
2\exp\left(
-\frac12R_s(d)^2
\right).
$$

## 6. Constants and binomial asymptotics

Let
$$
f(x)=x\log x-(x-1)\log(x-1),
\qquad x>1.
$$
Then
$$
f'(x)=\log\frac{x}{x-1}>0.
$$
Thus there is a unique \(c>1\) satisfying
$$
f(c)=\frac12\log2.
$$
Set
$$
L=f'(c)=\log\frac c{c-1}.
$$

Numerically,
$$
c=1.1048284166\ldots,
\qquad
L=2.3551204363\ldots,
$$
and
$$
\frac1{2L}=0.2123033677\ldots.
$$

Define
$$
m_n=
cn+
\frac{\log n}{2L}
+
\frac{\log\log n}{2L}.
$$

Lemma 6.1. Top binomial asymptotic

Uniformly for (u=O(1)),
$$
\frac{\binom{m_n+u}{n}}{2^{n/2}}
=
\left(
\sqrt{\frac{c}{2\pi(c-1)}}+o(1)
\right)
e^{Lu}\sqrt{\log n}.
$$

More generally, uniformly for (u=O\(\log n\)),
$$
\log\binom{cn+u}{n}
=
n f(c)
+
uL
=
\frac12\log n
+
\frac12\log\frac{c}{2\pi(c-1)}
+
o(1).
$$

Proof

Stirling's formula gives, uniformly for (d=cn+O\(\log n\)),
$$
\log\binom dn
=
d\log d
=
n\log n
=
(d-n)\log(d-n)
=
\frac12\log\left(2\pi n\frac{d-n}{d}\right)
+
o(1).
$$
Writing \(d=cn+u\), with (u=O\(\log n\)), and expanding at (c), we get
$$
d\log d
=
n\log n
=
(d-n)\log(d-n)
=
n f(c)+u f'(c)+o(1).
$$
Since (f'(c)=L), this gives
$$
\log\binom{cn+u}{n}
=
n f(c)
+
uL
=
\frac12\log n
+
\frac12\log\frac{c}{2\pi(c-1)}
+
o(1).
$$
Since (f(c)=\frac12\log2), substituting
$$
u=
\frac{\log n}{2L}
+
\frac{\log\log n}{2L}
+
O(1)
$$
yields the first formula. \(\square\)

Lemma 6.2. Near-top ratio

Let (d=cn+O\(\log n\)). For \(0\le k\le n\),
$$
\frac{R_{n-k}(d)}{R_n(d)}
=
2^{k/2}
\prod_{j=0}^{k-1}
\frac{n-j}{d-n+j+1}.
$$

In particular, for sufficiently small fixed \(\delta>0\), there exists \(a>1\) such that for all \(0\le k\le\delta n\), and all sufficiently large (n),
$$
R_{n-k}(d)\ge R_n(d)a^k.
$$

Proof

We compute
$$
\frac{R_{n-k}(d)}{R_n(d)}
=
\frac{\binom d{n-k}}{\binom dn}2^{k/2}.
$$
Since
$$
\frac{\binom d{n-k}}{\binom dn}
=
\frac{n!(d-n)!}{(n-k)!(d-n+k)!}
=
\prod_{j=0}^{k-1}
\frac{n-j}{d-n+j+1},
$$
the identity follows.

If (d=cn+O\(\log n\)), then for \(0\le k\le\delta n\),
$$
\frac{n-j}{d-n+j+1}
\ge
\frac{1-\delta+o(1)}{c-1+\delta+o(1)}.
$$
For sufficiently small \(\delta>0\),
$$
\sqrt2\frac{1-\delta}{c-1+\delta}>1.
$$
This gives the claim. \(\square\)

## 7. Main theorem

Theorem 7.1

Let \(G_n:{0,1}^n\to{-1,1}\) be uniformly random. Then
$$
D_{\mathrm{ex},1}(G_n)
=
cn+
\frac{\log n}{2L}
+
\frac{\log\log n}{2L}
+
O_{\mathbb{P}}(1).
$$

Equivalently, the sequence
$$
D_{\mathrm{ex},1}(G_n)-m_n
$$
is tight.

## 8. Upper bound

We prove that there exists \(M<\infty\) such that
$$
\mathbb{P}\left(
D_{\mathrm{ex},1}(G_n)\le m_n+M
\right)\to1.
$$

Let
$$
d_n^+=\lceil m_n+M\rceil.
$$

By Lemma 4.1 and Hoeffding's inequality,
$$
\mathbb{P}\left(
D_{\mathrm{ex},1}(G_n)>d_n^+
\right)
\le
2\sum_{s=0}^n
\binom ns
\exp\left(
-\frac12R_s(d_n^+)^2
\right).
$$

We split the levels into three ranges.

Low levels

Choose \(\eta>0\) sufficiently small so that
$$
\frac c\eta>2.
$$
For \(1\le s\le\eta n\), and all sufficiently large (n),
$$
\binom{d_n^+}{s}
\ge
\left(\frac{d_n^+}{s}\right)^s
\ge
2^s.
$$
But deterministically
$$
|\mu_S(G_n)|\le2^s.
$$
Thus no failure can occur in this range. The case \(s=0\) is also deterministic:
$$
|\mu_\varnothing(G_n)|=1=\binom{d_n^+}{0}.
$$

Middle levels

Fix \(\delta>0\). For
$$
\eta n\le s\le(1-\delta)n,
$$
write \(s=\rho n\). Stirling's formula gives, uniformly for \(\rho\in[\eta,1-\delta]\),
$$
\log R_s(d_n^+)
=
n\rho
\left[
f\left(\frac c\rho\right)-\frac12\log2
\right]
+
o(n).
$$
Since \(\rho<1\), we have \(c/\rho>c\). Because (f) is strictly increasing and
$$
f(c)=\frac12\log2,
$$
the bracket is bounded below by a positive constant depending only on \(\eta,\delta\). Hence
$$
R_s(d_n^+)\ge e^{\kappa n}
$$
uniformly in the middle range, for some \(\kappa>0\). Therefore the total middle-level contribution is at most
$$
2^{n+1}\exp\left(-\frac12e^{2\kappa n}\right)=o(1).
$$

Near-top levels

Let
$$
s=n-k,
\qquad
0\le k\le\delta n,
$$
where \(\delta>0\) is chosen sufficiently small for Lemma 6.2.

By Lemmas 6.1 and 6.2,
$$
R_{n-k}(d_n^+)
\ge
C_M a^k\sqrt{\log n},
$$
where \(a>1\) is fixed and \(C_M\to\infty\) as \(M\to\infty\).

Choose (M) sufficiently large so that
$$
\frac12C_M^2a^{2k}\ge k+3
\qquad(k\ge0).
$$
Then
$$
\binom nk
\exp\left(-\frac12R_{n-k}(d_n^+)^2\right)
\le
\exp\left(k\log n-(k+3)\log n\right)
=
n^{-3}.
$$
Summing over \(0\le k\le\delta n\), the near-top contribution is (o(1)).

Combining all ranges gives
$$
\mathbb{P}\left(
D_{\mathrm{ex},1}(G_n)>d_n^+
\right)\to0.
$$
Therefore
$$
D_{\mathrm{ex},1}(G_n)\le m_n+M
$$
with probability tending to (1).

## 9. Lower bound

We prove that there exists \(M<\infty\) such that
$$
\mathbb{P}\left(
D_{\mathrm{ex},1}(G_n)\ge m_n-M
\right)\to1.
$$

Let
$$
d_n^-=\lfloor m_n-M\rfloor.
$$

We use only the level (n-1). For \(i=1,\dots,n\), set
$$
S_i=[n]\setminus{i}
$$
and
$$
X_i=2^{-(n-1)/2}\mu_{S_i}(G_n).
$$

We show that
$$
\max_{1\le i\le n}|X_i|\ge c_0\sqrt{\log n}
$$
with probability tending to (1), for some absolute constant \(c_0>0\).

Define
$$
\eta_T=(-1)^{n-|T|}G_n(1_T),
\qquad T\subseteq[n].
$$
The variables \(\eta_T\) are independent Rademacher variables.

For \(i=1,\dots,n\), define
$$
\chi_i(T)=
\begin{cases}
1,&i\notin T,\\
-1,&i\in T.
\end{cases}
$$
Set
$$
A=2^{-n/2}\sum_{T\subseteq[n]}\eta_T,
$$
and
$$
B_i=2^{-n/2}\sum_{T\subseteq[n]}\chi_i(T)\eta_T.
$$

Since
$$
\mathbf 1_{{T\subseteq S_i}}
=
\frac{1+\chi_i(T)}2,
$$
we have
$$
X_i=-\frac1{\sqrt2}(A+B_i).
$$

Let
$$
B=(B_1,\dots,B_n).
$$
Then
$$
B=\sum_{T\subseteq[n]}Y_T,
$$
where
$$
Y_T
=
2^{-n/2}\eta_T
(\chi_1(T),\dots,\chi_n(T)).
$$
The vectors \(Y_T\) are independent, mean zero, and
$$
\sum_T\operatorname{Cov}(Y_T)=I_n,
$$
because the Walsh characters \(\chi_i\) are orthogonal on the Boolean cube.

Moreover,
$$
|Y_T|_2=2^{-n/2}\sqrt n.
$$
Therefore
$$
\sum_T\mathbb{E}|Y_T|_2^3
=
2^n(2^{-n/2}\sqrt n)^3
=
n^{3/2}2^{-n/2}.
$$

We use the following standard multivariate Berry--Esseen estimate for convex sets: if independent mean-zero random vectors in \(\mathbb{R}^m\) have total covariance \(I_m\), then
$$
\sup_{C\in\mathcal C_m}
\left|
\mathbb{P}\left(\sum_j Y_j\in C\right)-\mathbb{P}(Z\in C)
\right|
\le
C_0 m^{1/4}\sum_j\mathbb{E}|Y_j|_2^3,
$$
where \(\mathcal C_m\) is the class of convex Borel subsets of \(\mathbb{R}^m\), (Z\sim N\(0,I_m\)), and \(C_0\) is an absolute constant.

In our case, \(m=n\), so the error is at most
$$
C_0 n^{1/4}n^{3/2}2^{-n/2}
=
C_0 n^{7/4}2^{-n/2}
=o(1).
$$

Therefore, for every rectangle
$$
C_t=[-t,t]^n,
$$
we have
$$
\mathbb{P}(B\in C_t)=\mathbb{P}(Z\in C_t)+o(1),
$$
where (Z=\(Z_1,\dots,Z_n\)) is a standard Gaussian vector in \(\mathbb{R}^n\).

Take
$$
t=\frac12\sqrt{\log n}.
$$
Then
$$
\mathbb{P}\left(\max_i|Z_i|\le t\right)
=
\left(1-2\mathbb{P}(Z_1>t)\right)^n.
$$
Since
$$
n\mathbb{P}(Z_1>t)\to\infty,
$$
this probability tends to (0). Hence
$$
\mathbb{P}\left(\max_i|B_i|\ge\frac12\sqrt{\log n}\right)\to1.
$$

On the other hand, (A) is a normalized Rademacher sum, so Hoeffding gives
$$
\mathbb{P}\left(|A|>\frac14\sqrt{\log n}\right)
\le
2e^{-(\log n)/32}
=o(1).
$$
Consequently, with probability tending to (1),
$$
\max_i|A+B_i|
\ge
\max_i|B_i|-|A|
\ge
\frac14\sqrt{\log n}.
$$
Since
$$
X_i=-\frac1{\sqrt2}(A+B_i),
$$
we obtain
$$
\max_i|X_i|
\ge
\frac1{4\sqrt2}\sqrt{\log n}
$$
with probability tending to (1).

Now estimate the normalized capacity at level (n-1). By Lemmas 6.1 and 6.2,
$$
R_{n-1}(d_n^-)
=
\frac{\binom{d_n^-}{n-1}}{2^{(n-1)/2}}
=
(C_+o(1))e^{-LM}\sqrt{\log n},
$$
where
$$
C_=
\sqrt{\frac{c}{2\pi(c-1)}}\frac{\sqrt2}{c-1}.
$$
Choose (M) sufficiently large so that
$$
C_*e^{-LM}<\frac1{4\sqrt2}.
$$
Then, with probability tending to (1), there exists (i) such that
$$
|\mu_{S_i}(G_n)|>\binom{d_n^-}{n-1}.
$$
By Lemma 4.1, no exact ternary homogeneous lift of degree \(d_n^-\) exists. Hence
$$
D_{\mathrm{ex},1}(G_n)>d_n^-
$$
with probability tending to (1).

Thus
$$
D_{\mathrm{ex},1}(G_n)\ge m_n-M
$$
with high probability.

Combining the upper and lower bounds proves Theorem 7.1. \(\square\)

## 10. Interpretation

The first-order constant (c) comes from balancing
$$
\binom dn
$$
against the natural scale \(2^{n/2}\) of the top Möbius coefficient.

The correction
$$
\frac{\log n}{2L}
$$
compensates for the Stirling factor \(n^{-1/2}\).

The additional correction
$$
\frac{\log\log n}{2L}
$$
is forced by the (n) coefficients
$$
\mu_{[n]\setminus{i}}(G_n),
\qquad i=1,\dots,n.
$$
After normalization, these coefficients have maximum of order \(\sqrt{\log n}\). This factor translates into the additive degree shift
$$
\frac{\log\log n}{2L}.
$$

Thus the top coefficient determines the (cn) and \(\log n\) terms, while the level (n-1) forces the \(\log\log n\) term.

## 11. Relation to threshold sign-representation

The exact interpolation problem studied above is distinct from threshold sign-representation.

In threshold sign-representation, one seeks an integer-valued function (v) such that
$$
g(x)v(x)>0
\qquad(x\in{0,1}^n),
$$
and then asks whether the Möbius coefficients of (v) fit inside the same homogeneous coefficient capacities. This additional freedom can substantially reduce the necessary degree.

We record the real dual formulation of the bounded-coefficient threshold problem, since it clarifies the distinction.

Let \(B_S\ge0\) be coefficient bounds, and define
$$
\gamma_B(g)
=
\max_{|a_S|\le B_S}
\min_{T\subseteq[n]}
g(1_T)\sum_{S\subseteq T}a_S.
$$
Let \(\Delta\) be the simplex of probability measures on \(2^{[n]}\).

Then minimax duality gives
$$
\gamma_B(g)
=
\min_{\lambda\in\Delta}
\sum_{S\subseteq[n]}
B_S
\left|
\sum_{T\supseteq S}
\lambda_Tg(1_T)
\right|.
$$

For the degree-(n), height-(1) homogeneous model,
$$
B_S=\binom n{|S|}.
$$
The choice \(\lambda=\delta_\varnothing\) gives value (1), so
$$
\gamma_B(g)\le1
$$
for every (g).

Thus the random threshold sign-representation problem asks whether, for random \(G_n\),
$$
\gamma_B(G_n)=1
$$
with high probability, and then whether a suitable integer rounding with slack is possible. This is not solved here.

A useful deterministic estimate for the RMS scale of the dual expression is the following.

Proposition 11.1. Square-root zeta lower bound

Let \(n\ge4\), and let \(\lambda\) be a probability measure on \(2^{[n]}\). Define
$$
\Phi_n(\lambda)
=
\sum_{S\subseteq[n]}
\binom n{|S|}
\left(
\sum_{T\supseteq S}\lambda_T^2
\right)^{1/2}.
$$
Then
$$
\Phi_n(\lambda)
\ge
\left(\sum_T\lambda_T^2\right)^{1/2}
+
n\sum_{T\ne\varnothing}\lambda_T.
$$
In particular,
$$
\Phi_n(\lambda)
\ge
1+(n-1)(1-\lambda_\varnothing).
$$

Proof

For nonempty (S), set
$$
m_S=
\max_{\substack{T\supseteq S\\ T\ne\varnothing}}\lambda_T,
$$
with \(m_S=0\) if there is no such (T). Since
$$
\left(
\sum_{T\supseteq S}\lambda_T^2
\right)^{1/2}
\ge m_S,
$$
we have
$$
\sum_{S\ne\varnothing}
\binom n{|S|}
\left(
\sum_{T\supseteq S}\lambda_T^2
\right)^{1/2}
\ge
\sum_{S\ne\varnothing}
\binom n{|S|}m_S.
$$

For \(t>0\), define
$$
\mathcal A_t={T\ne\varnothing:\lambda_T\ge t}.
$$
Then
$$
m_S=
\int_0^\infty
\mathbf 1_{{S\in\downarrow\mathcal A_t}},dt,
$$
where
$$
\downarrow\mathcal A_t
=
{S\ne\varnothing:\exists T\in\mathcal A_t,\ S\subseteq T}.
$$

We use the elementary fact that if
$$
\mathcal D\subseteq2^{[n]}\setminus{\varnothing}
$$
is a nonempty downset and \(n\ge4\), then
$$
\sum_{S\in\mathcal D}\binom n{|S|}
\ge n|\mathcal D|.
$$
Indeed, if \([n]\notin\mathcal D\), then every \(S\in\mathcal D\) has \(1\le |S|\le n-1\), and \(\binom n{|S|}\ge n\). If \([n]\in\mathcal D\), then \(\mathcal D=2^{[n]}\setminus{\varnothing}\), and
$$
\sum_{S\in\mathcal D}\binom n{|S|}
=
\sum_{s=1}^n\binom ns^2
\ge
n(2^n-1)
=
n|\mathcal D|,
$$
for \(n\ge4\); the surplus at level (2) compensates the deficit at the top level.

Applying this to \(\downarrow\mathcal A_t\), we obtain
$$
\sum_{S\ne\varnothing}\binom n{|S|}m_S
=
\int_0^\infty
\sum_{S\in\downarrow\mathcal A_t}
\binom n{|S|},dt
\ge
n\int_0^\infty|\mathcal A_t|,dt.
$$
But
$$
\int_0^\infty|\mathcal A_t|,dt
=
\sum_{T\ne\varnothing}\lambda_T.
$$
Therefore the nonempty part contributes at least
$$
n\sum_{T\ne\varnothing}\lambda_T.
$$

The \(S=\varnothing\) term is
$$
\left(\sum_T\lambda_T^2\right)^{1/2}.
$$
This proves the first inequality. The second follows from
$$
\left(\sum_T\lambda_T^2\right)^{1/2}
\ge\lambda_\varnothing.
$$
\(\square\)

This proposition shows that any dual measure with noticeable mass away from the origin has a large RMS zeta profile. It is included only as context for the harder threshold sign-representation problem.

## 12. Scope and limitations

This paper concerns exact interpolation by expanded homogeneous integer forms in one fixed presentation model. It does not give coordinate-invariant lower bounds for polynomial threshold functions.

The theorem does not solve the random bounded-height threshold sign-representation problem. In particular, it does not determine
$$
H_{\min}(G_n,n)
$$
or the random threshold degree
$$
D_{\mathrm{thr},1}(G_n).
$$

The main contribution is the sharp random degree threshold for exact ternary homogeneous lifts.

## References

P. Baldi and R. Vershynin, Polynomial threshold functions, hyperplane arrangements, and random tensors, SIAM Journal on Mathematics of Data Science 1 (2019), no. 4, 699--729.

V. Bentkus, On the dependence of the Berry--Esseen bound on dimension, Journal of Statistical Planning and Inference 113 (2003), 385--402.

S. Boucheron, G. Lugosi, and P. Massart, Concentration Inequalities: A Nonasymptotic Theory of Independence, Oxford University Press, 2013.

R. O'Donnell, Analysis of Boolean Functions, Cambridge University Press, 2014.

R. O'Donnell and R. A. Servedio, New degree bounds for polynomial threshold functions, Combinatorica 30 (2010), 327--358.
