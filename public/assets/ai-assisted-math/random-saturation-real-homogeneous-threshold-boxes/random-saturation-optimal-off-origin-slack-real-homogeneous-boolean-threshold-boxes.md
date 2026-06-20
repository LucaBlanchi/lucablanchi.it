# Random Saturation and Optimal Off-Origin Slack in Real Homogeneous Boolean Threshold Boxes
## Abstract
We study bounded-height homogeneous real polynomial lifts of Boolean sign functions. A homogeneous form of degree (D) in variables \(X_0,\dots,X_n\), with all homogeneous coefficients bounded in absolute value by (1), induces on the affine Boolean chart
$$
(X_0,X_1,\dots,X_n)=(1,x_1,\dots,x_n),
\qquad x_i\in{0,1},
$$
a multilinear polynomial
$$
p(x)=\sum_{S\subseteq[n]}a_Sx_S
$$
whose coefficients satisfy the exact box constraints
$$
|a_S|\le \binom{D}{|S|}.
$$
Conversely, every coefficient vector satisfying these inequalities arises from a homogeneous degree-(D) form of coefficient height at most (1).
For a Boolean sign function \(G:{0,1}^n\to{\pm1}\), define the real box margin
$$
\gamma_D(G)=
\max_{|a_S|\le \binom{D}{|S|}}
\min_{T\subseteq[n]}
G_T\sum_{S\subseteq T}a_S.
$$
Since the empty point sees only \(a_\varnothing\), one always has
$$
\gamma_D(G)\le1.
$$
Let \(H_2\) denote the binary entropy function, and let (\rho_\in(1/2,1)) be the unique solution of
$$
H_2(\rho_*)=\rho_*.
$$
Numerically,
$$
\rho_*=0.7729078047\ldots,
\qquad
\frac1{2\rho_*}=0.6469076867\ldots.
$$
We prove that if \(D_n\) is a linear degree sequence satisfying
$$
0<\liminf_{n\to\infty}\frac{D_n}{n}
\le
\limsup_{n\to\infty}\frac{D_n}{n}
<\infty
$$
and
$$
\liminf_{n\to\infty}\frac{D_n}{n}>
\frac1{2\rho_*},
$$
then for uniformly random \(G_n:{0,1}^n\to{\pm1}\),
$$
\Pr(\gamma_{D_n}(G_n)=1)\to1.
$$
The main theorem is sharper. After fixing the empty coefficient to saturate the origin, the optimal margin on every non-origin Boolean point is asymptotically maximal:
$$
\eta_{D_n}(G_n)=D_n-1-o(1)
\qquad\text{with high probability}.
$$
Thus, in this bounded-height homogeneous real model, the origin is the unique bottleneck.
The proof combines exact minimax duality for boxes, a sharp weighted upward-zeta localization estimate, a complement transform converting high-zeta data into low-degree Boolean polynomials, and a projection-separation lemma showing that a random signed simplex is far in \(\ell^1\) from every sufficiently low-dimensional polynomial subspace.
All results in this paper are over real coefficients. They do not imply integer, ternary, or rounded coefficient representations.

## 1. Introduction
A classical question in Boolean function analysis asks for the degree needed to sign-represent a Boolean function by a real polynomial. In the unbounded-coefficient setting, random Boolean functions have threshold degree near (n/2). This paper studies a different model: real polynomial representations arising from homogeneous forms of bounded coefficient height.
Let
$$
F\in \mathbb{R}[X_0,\dots,X_n]_D
$$
be homogeneous of degree (D). Restrict (F) to the affine Boolean chart
$$
(X_0,X_1,\dots,X_n)=(1,x_1,\dots,x_n),
\qquad x_i\in{0,1},
$$
and reduce by the Boolean relations
$$
x_i^2=x_i.
$$
If every homogeneous coefficient of (F) has absolute value at most (1), the resulting multilinear polynomial
$$
p(x)=\sum_{S\subseteq[n]}a_Sx_S
$$
satisfies
$$
|a_S|\le \binom{D}{|S|}.
$$
Conversely, every multilinear coefficient vector satisfying these inequalities is realized by some homogeneous degree-(D) form with coefficient height at most (1). Thus the coefficient body induced by height-one homogeneous degree-(D) forms is exactly
$$
\mathcal B_{n,D}
\left\{
a=(a_S)_{S\subseteq[n]}:
|a_S|\le \binom{D}{|S|}
\right\},
$$
with the convention
$$
\binom{D}{s}=0
\qquad (s>D).
$$
For \(G:{0,1}^n\to{\pm1}\), define
$$
\gamma_D(G)=
\max_{a\in\mathcal B_{n,D}}
\min_{T\subseteq[n]}
G_T\sum_{S\subseteq T}a_S.
$$
At the empty point \(T=\varnothing\), the polynomial value is simply \(a_\varnothing\). Since
$$
|a_\varnothing|\le 1,
$$
one always has
$$
\gamma_D(G)\le1.
$$
We prove that this upper bound is attained with high probability for random (G) once
$$
D>(0.646907\ldots)n.
$$
More precisely, in the linear degree regime
$$
D_n=\Theta(n),
$$
if
$$
\liminf_{n\to\infty}\frac{D_n}{n}>
\frac1{2\rho_*},
$$
then
$$
\gamma_{D_n}(G_n)=1
$$
with high probability.
The theorem is stronger than saturation. After fixing \(a_\varnothing\) to saturate the origin, the optimal margin on every nonempty Boolean point is
$$
D_n-1-o(1),
$$
which is asymptotically the largest possible margin forced by singleton constraints.
This is a bounded-coefficient random representation theorem for a concrete homogeneous coefficient body. It is not an unbounded-coefficient threshold-degree theorem.

## 2. Homogeneous coefficient boxes
We identify a Boolean vector \(x\in{0,1}^n\) with its support
$$
T={i:x_i=1}\subseteq[n].
$$
For \(S\subseteq[n]\), write
$$
x_S=\prod_{i\in S}x_i.
$$
Let
$$
F\in\mathbb{R}[X_0,\dots,X_n]_D
$$
be homogeneous of degree (D). A monomial
$$
X_0^{\alpha_0}X_1^{\alpha_1}\cdots X_n^{\alpha_n},
\qquad
\sum_{i=0}^n\alpha_i=D,
$$
reduces on the affine Boolean chart to \(x_S\) precisely when
$$
\alpha_i\ge1 \quad (i\in S),
$$
and
$$
\alpha_j=0 \quad (j\notin S,\ j\ge1).
$$
Thus the number of homogeneous degree-(D) monomials reducing to \(x_S\) is the number of solutions
$$
\alpha_0+\sum_{i\in S}\alpha_i=D,
\qquad
\alpha_0\ge0,
\qquad
\alpha_i\ge1\quad(i\in S).
$$
Equivalently, after writing
$$
\beta_i=\alpha_i-1\quad(i\in S),
$$
we count nonnegative solutions of
$$
\alpha_0+\sum_{i\in S}\beta_i=D-|S|.
$$
The number is
$$
\binom{D}{|S|}.
$$
Therefore, if every homogeneous coefficient of (F) lies in ([-1,1]), the induced Boolean coefficient \(a_S\) satisfies
$$
|a_S|\le \binom{D}{|S|}.
$$
Conversely, suppose
$$
|a_S|\le \binom{D}{|S|}
$$
for every \(S\subseteq[n]\). For each (S), distribute the real number \(a_S\) evenly among the \(\binom{D}{|S|}\) homogeneous monomials reducing to \(x_S\). Each assigned homogeneous coefficient has absolute value at most (1), and the resulting homogeneous degree-(D) form restricts to the given multilinear polynomial on the Boolean cube.
Hence the exact real coefficient box induced by homogeneous degree-(D), height-one forms is
$$
\mathcal B_{n,D}
\left\{
a=(a_S)_{S\subseteq[n]}:
|a_S|\le \binom{D}{|S|}
\right\}.
$$

## 3. Margins and off-origin slack
Let
$$
G:{0,1}^n\to{\pm1},
$$
and write
$$
G_T=G(1_T).
$$
Define the full box margin
$$
\gamma_D(G)=
\max_{|a_S|\le \binom{D}{|S|}}
\min_{T\subseteq[n]}
G_T\sum_{S\subseteq T}a_S.
$$
As noted above,
$$
\gamma_D(G)\le1.
$$
Because the coefficient box is centrally symmetric,
$$
\gamma_D(G)=\gamma_D(-G).
$$
Thus we may normalize
$$
G_\varnothing=1
$$
when proving lower bounds.
For unnormalized (G), define the off-origin margin by fixing the empty coefficient to saturate the origin:
$$
\eta_D(G)
\max_{\substack{|a_S|\le \binom{D}{|S|}\ a_\varnothing=G_\varnothing}}
\min_{\varnothing\ne T\subseteq[n]}
G_T\sum_{S\subseteq T}a_S.
$$
After multiplying (G) by \(G_\varnothing\), this is equivalent to the normalized setting
$$
G_\varnothing=1,
\qquad
a_\varnothing=1.
$$
If
$$
\eta_D(G)\ge1,
$$
then
$$
\gamma_D(G)=1.
$$
Indeed, the empty point has margin exactly (1), and every nonempty point has margin at least (1).
The main theorem proves much more:
$$
\eta_{D_n}(G_n)=D_n-1-o(1)
$$
with high probability for random \(G_n\), in the linear degree regime above the threshold
$$
\frac1{2\rho_*}.
$$

## 4. Exact minimax duality
We first record a general box-duality statement.
Let
$$
B=(B_S){S\subseteq[n]}
$$
be a nonnegative weight system, and define
$$
\gamma_B(G)=
\max_{|a_S|\le B_S}
\min_{T\subseteq[n]}
G_T\sum_{S\subseteq T}a_S.
$$
Let
$$
\Delta(2^{[n]})
$$
denote the probability simplex on all subsets of ([n]).
Theorem 4.1. Box duality
For every \(G:{0,1}^n\to{\pm1}\),
$$
\gamma_B(G)
\min_{\lambda\in\Delta(2^{[n]})}
\sum_{S\subseteq[n]}B_S
\left|
\sum_{T\supseteq S}\lambda_TG_T
\right|.
$$
Proof
For fixed (a=\(a_S\)), put
$$
L_T(a)=G_T\sum_{S\subseteq T}a_S.
$$
Then
$$
\min_TL_T(a)
\min_{\lambda\in\Delta(2^{[n]})}
\sum_T\lambda_TL_T(a).
$$
Hence
$$
\gamma_B(G)
\max_{|a_S|\le B_S}
\min_{\lambda\in\Delta(2^{[n]})}
\sum_T\lambda_TG_T\sum_{S\subseteq T}a_S.
$$
The coefficient box and the simplex are compact convex sets, and the objective is bilinear. By finite-dimensional minimax duality,
$$
\gamma_B(G)
\min_{\lambda\in\Delta(2^{[n]})}
\max_{|a_S|\le B_S}
\sum_Sa_S
\sum_{T\supseteq S}\lambda_TG_T.
$$
For fixed \(\lambda\), the inner maximum is the support function of the box:
$$
\max_{|a_S|\le B_S}\sum_Sa_Sc_S
\sum_SB_S|c_S|.
$$
Taking
$$
c_S=\sum_{T\supseteq S}\lambda_TG_T
$$
gives the result. \(\square\)

## 5. Duality for off-origin slack
Assume throughout this section that
$$
G_\varnothing=1.
$$
For a probability measure \(\nu\) on nonempty subsets, define
$$
A_G(\nu)=
\sum_{T\ne\varnothing}\nu_TG_T
$$
and
$$
B_{D,G}(\nu)
\sum_{\substack{S\ne\varnothing\ |S|\le D}}
\binom{D}{|S|}
\left|
\sum_{\substack{T\supseteq S\\ T\ne\varnothing}}\nu_TG_T
\right|.
$$
Proposition 5.1. Dual form of off-origin slack
For \(G_\varnothing=1\),
$$
\eta_D(G)
\min_{\nu\in\Delta(2^{[n]}\setminus{\varnothing})}
\left[
A_G(\nu)+B_{D,G}(\nu)
\right].
$$
Proof
In the definition of \(\eta_D\), the coefficient \(a_\varnothing\) is fixed to (1), and the variables are \(a_S\) for \(S\ne\varnothing\). For a probability measure \(\nu\) on nonempty (T), the averaged objective is
$$
\sum_{T\ne\varnothing}\nu_TG_T
\left(
1+
\sum_{\substack{S\subseteq T\S\ne\varnothing}}a_S
\right).
$$
This equals
$$
A_G(\nu)
+
\sum_{S\ne\varnothing}a_S
\sum_{\substack{T\supseteq S\\ T\ne\varnothing}}\nu_TG_T.
$$
Applying minimax over the coefficient box for the variables \(a_S\), \(S\ne\varnothing\), the maximum over
$$
|a_S|\le \binom{D}{|S|}
$$
is precisely
$$
B_{D,G}(\nu).
$$
Thus
$$
\eta_D(G)
\min_\nu
\left[
A_G(\nu)+B_{D,G}(\nu)
\right].
$$
\(\square\)
Since always
$$
A_G(\nu)\ge-1,
$$
a uniform lower bound on (B_{D,G}\(\nu\)) gives an off-origin slack lower bound.

## 6. Sharp weighted upward-zeta localization
Let \(\nu\) be a probability measure on nonempty subsets and define
$$
\theta_T=\nu_TG_T,
\qquad T\ne\varnothing.
$$
Then
$$
|\theta|_1=1.
$$
Define the upward-zeta transform of \(\theta\) by
$$
h_S=
\sum_{\substack{T\supseteq S\\ T\ne\varnothing}}\theta_T,
\qquad S\ne\varnothing.
$$
Then
$$
B_{D,G}(\nu)
\sum_{\substack{S\ne\varnothing\ |S|\le D}}
\binom{D}{|S|}|h_S|.
$$
For \(1\le r\le D\), let \(h^{\le r}\) be the restriction of (h) to levels
$$
1\le |S|\le r.
$$
Let \(\theta^{\le r}\) be the Möbius inverse of this truncated zeta transform:
$$
\theta_T^{\le r}
\sum_{\substack{S\supseteq T\\ 1\le |S|\le r}}
(-1)^{|S|-|T|}h_S,
\qquad T\ne\varnothing.
$$
Define
$$
\mathfrak m^*(D,r)
\max_{1\le s\le r}
\frac{2^s-1}{\binom{D}{s}}.
$$
Lemma 6.1. Sharp truncated inverse bound
For every \(\nu\),
$$
|\theta^{\le r}|_1
\le
\mathfrak m^*(D,r)B_{D,G}(\nu).
$$
Proof
By the triangle inequality,
$$
|\theta_T^{\le r}|
\le
\sum_{\substack{S\supseteq T\\ 1\le |S|\le r}}|h_S|.
$$
Summing over all nonempty (T),
$$
|\theta^{\le r}|_1
\le
\sum_{1\le |S|\le r}
|{T\ne\varnothing:T\subseteq S}|,|h_S|.
$$
For fixed \(S\ne\varnothing\),
$$
|{T\ne\varnothing:T\subseteq S}|=2^{|S|}-1.
$$
Therefore
$$
|\theta^{\le r}|_1
\le
\sum_{1\le |S|\le r}(2^{|S|}-1)|h_S|.
$$
Hence
$$
|\theta^{\le r}|_1
\le
\left(
\max_{1\le s\le r}
\frac{2^s-1}{\binom{D}{s}}
\right)
\sum_{1\le |S|\le r}
\binom{D}{|S|}|h_S|
\le
\mathfrak m^*(D,r)B_{D,G}(\nu).
$$
\(\square\)
The upward-zeta transform of \(\theta^{\le r}\) agrees with (h) on all nonempty levels \(1\le |S|\le r\) and vanishes on nonempty levels \(|S|>r\). Hence, if
$$
\theta^{>r}=\theta-\theta^{\le r},
$$
then the upward-zeta transform of \(\theta^{>r}\) vanishes on all nonempty levels
$$
1\le |S|\le r.
$$

## 7. Complement transform and low-degree polynomials
Let
$$
\theta^{>r}=\theta-\theta^{\le r}.
$$
The upward-zeta transform of \(\theta^{>r}\) vanishes on every nonempty level
$$
1\le |S|\le r.
$$
Let
$$
\Omega_n^\circ={U\subseteq[n]:U\ne[n]}.
$$
For \(U\in\Omega_n^\circ\), set
$$
T=U^c.
$$
Then \(T\ne\varnothing\). Define
$$
q(U)=(-1)^{|U|}\theta^{>r}_{U^c}.
$$
Lemma 7.1. Complement-degree lemma
The function (q) is the restriction to \(\Omega_n^\circ\) of a real multilinear polynomial of degree at most (n-r).
Proof
Let \(h^{>r}\) be the upward-zeta transform of \(\theta^{>r}\). Möbius inversion gives
$$
\theta_T^{>r}
\sum_{S\supseteq T}
(-1)^{|S|-|T|}h_S^{>r}.
$$
Put
$$
T=U^c
\qquad\text{and}\qquad
R=S^c.
$$
Then \(S\supseteq T\) is equivalent to \(R\subseteq U\), and
$$
|S|-|T|
(n-|R|)-(n-|U|)
|U|-|R|.
$$
Therefore
$$
q(U)
(-1)^{|U|}\theta^{>r}_{U^c}
\sum_{R\subseteq U}
(-1)^{|R|}h^{>r}_{R^c}.
$$
Since \(h_S^{>r}=0\) whenever \(S\ne\varnothing\) and \(|S|\le r\), all nonzero terms satisfy
$$
|R^c|>r.
$$
Equivalently,
$$
|R|<n-r.
$$
Thus (q) is represented by a multilinear polynomial of degree at most (n-r-1), and hence certainly of degree at most (n-r). \(\square\)

## 8. Projection separation from signed simplices
Let \(\Omega\) be a finite set and let
$$
V\subseteq\mathbb{R}^\Omega
$$
be a linear subspace. Let
$$
\xi\in{\pm1}^{\Omega}.
$$
Define the signed simplex
$$
\mathcal C_\xi=
{\xi\cdot\mu:\mu\in\Delta(\Omega)},
$$
where
$$
(\xi\cdot\mu)\omega=\xi\omega\mu_\omega.
$$
Let \(\Pi_V\) be the orthogonal projection onto (V) with respect to the counting inner product
$$
\langle f,g\rangle
\sum_{\omega\in\Omega}f_\omega g_\omega.
$$
Lemma 8.1. Projection separation
If
$$
|\Pi_V\xi|_\infty\le\tau,
$$
then for every \(q\in V\) and every (\mu\in\Delta\(\Omega\)),
$$
|q-\xi\cdot\mu|_1
\ge
\frac{1-\tau}{1+\tau}.
$$
Proof
Let
$$
\delta=|q-\xi\cdot\mu|_1.
$$
Since
$$
\langle \xi,\xi\cdot\mu\rangle
\sum_{\omega}\mu_\omega
1,
$$
we have
$$
\langle \xi,q\rangle
1+\langle \xi,q-\xi\cdot\mu\rangle
\ge
1-\delta.
$$
Also,
$$
|q|_1
\le
|\xi\cdot\mu|_1+\delta
1+\delta.
$$
Since \(q\in V\),
$$
\langle \xi,q\rangle
\langle \Pi_V\xi,q\rangle
\le
|\Pi_V\xi|_\infty|q|_1
\le
\tau(1+\delta).
$$
Combining the last two inequalities,
$$
1-\delta\le \tau(1+\delta),
$$
and hence
$$
\delta\ge \frac{1-\tau}{1+\tau}.
$$
\(\square\)

## 9. Random projection on the punctured cube
Let
$$
\Omega_n={0,1}^n,
\qquad
N=2^n.
$$
We identify \(\Omega_n\) with \(2^{[n]}\). Let
$$
x_*=[n]
$$
be the top point, and set
$$
\Omega_n^\circ=\Omega_n\setminus{x_*}.
$$
Let \(L_{\le d}\) be the space of real multilinear polynomials of degree at most (d) on the full cube, and let \(W_{\le d}\) be its restriction to \(\Omega_n^\circ\). Put
$$
M=\binom{n}{\le d}.
$$
Lemma 9.1. Punctured projection estimate
Assume
$$
d<n
\qquad\text{and}\qquad
M/N\to0.
$$
Let
$$
\xi\in{\pm1}^{\Omega_n^\circ}
$$
be uniformly random. Let \(\Pi\) be the orthogonal projection onto \(W_{\le d}\) in (\ell^2\(\Omega_n^\circ\)). Then
$$
|\Pi\xi|_\infty
O_{\mathbb{P}}
\left(
\sqrt{\frac{Mn}{N}}
\right).
$$
In particular, if
$$
M/N\le2^{-\alpha n}
$$
for some \(\alpha>0\), then
$$
|\Pi\xi|_\infty=2^{-\Omega(n)}
$$
with high probability.
Proof
First, the restriction map
$$
L_{\le d}\to W_{\le d}
$$
is injective. Indeed, if \(P\in L_{\le d}\) vanished on all points of the cube except possibly \(x_*=[n]\), then, as a function on the full cube, it would be a scalar multiple of
$$
\mathbf 1_{{[n]}}(x)=x_1x_2\cdots x_n.
$$
This function has multilinear degree (n). Since \(d<n\), such a polynomial (P) must be zero. Hence
$$
\dim W_{\le d}=M.
$$
On the full cube, normalized Walsh characters of degree at most (d) form an orthonormal basis of \(L_{\le d}\). Hence the full projection matrix (P) onto \(L_{\le d}\) has diagonal
$$
P_{xx}=M/N
$$
for every \(x\in\Omega_n\).
Let (E) be the \(N\times M\) matrix with orthonormal columns spanning \(L_{\le d}\). Let (v) be the row of (E) corresponding to the deleted point \(x_*\). After deleting this row, the Gram matrix becomes
$$
I-vv^{\mathsf{T}}.
$$
Since
$$
|v|_2^2=P_{x_*x_*}=M/N<1
$$
for all large (n), its inverse is
$$
(I-vv^{\mathsf{T}})^{-1}
I+\frac{vv^{\mathsf{T}}}{1-|v|_2^2}.
$$
Therefore, for \(x\ne x_*\), the restricted projection matrix (P') satisfies
$$
P'_{xx}
=
P_{xx}
+
\frac{P_{xx_*}^2}{1-P_{x_*x_*}}.
$$
Since (P) is positive semidefinite,
$$
P_{xx_*}^2
\le
P_{xx}P_{x_*x_*}
\left(\frac MN\right)^2.
$$
Therefore, for all large (n),
$$
P'_{xx}\le \frac{2M}{N}.
$$
For fixed \(x\in\Omega_n^\circ\),
$$
(\Pi\xi)(x)=\sum_{y\in\Omega_n^\circ}P'_{xy}\xi_y.
$$
Since (P') is an orthogonal projection,
$$
\sum_y(P'_{xy})^2=P'_{xx}\le\frac{2M}{N}.
$$
Hoeffding's inequality gives
$$
\Pr\left(|(\Pi\xi)(x)|>t\right)
\le
2\exp\left(-\frac{t^2}{4M/N}\right).
$$
Taking
$$
t=A\sqrt{\frac{Mn}{N}}
$$
with (A) sufficiently large and union-bounding over at most (N) points proves the first claim. If \(M/N\le2^{-\alpha n}\), then this bound is exponentially small in (n). \(\square\)

## 10. A general off-origin slack criterion
Let \(D_n,r_n\) be integer sequences satisfying
$$
1\le r_n\le \min(D_n,n)
$$
eventually. Put
$$
d_n=n-r_n,
$$
$$
M_n=\binom{n}{\le d_n},
\qquad
N_n=2^n,
$$
and
$$
\mathfrak m_n^*
\mathfrak m^*(D_n,r_n)
\max_{1\le s\le r_n}
\frac{2^s-1}{\binom{D_n}{s}}.
$$
Theorem 10.1. General off-origin slack criterion
Assume:
there exists \(\varepsilon>0\) such that
$$
\frac{r_n}{n}>\frac12+\varepsilon
$$
for all sufficiently large (n);
\(\mathfrak m_n^*\to0\).
Then, for uniformly random \(G_n:{0,1}^n\to{\pm1}\), with high probability,
$$
\eta_{D_n}(G_n)
\ge
\frac{1-\tau_n}{1+\tau_n}\cdot\frac1{\mathfrak m_n^*}-1,
$$
where
$$
\tau_n=
O\left(\sqrt{\frac{M_nn}{N_n}}\right)
2^{-\Omega(n)}.
$$
In particular, if
$$
\frac{\tau_n}{\mathfrak m_n^*}=o(1),
$$
then
$$
\eta_{D_n}(G_n)
\ge
\frac1{\mathfrak m_n^*}-1-o(1).
$$
Proof
Normalize
$$
G_\varnothing=1
$$
by multiplying (G) globally by \(G_\varnothing\). The nonempty signs remain independent uniform signs.
Let \(\nu\) be any probability measure on nonempty subsets, and set
$$
\theta_T=\nu_TG_T.
$$
Let (h) be its upward-zeta transform. Let \(\theta^{\le r_n}\) and \(\theta^{>r_n}\) be defined as above. By Lemma 6.1,
$$
|\theta^{\le r_n}|_1
\le
\mathfrak m_n^*B_{D_n,G}(\nu).
$$
Now pass to complement variables. Define
$$
q(U)=(-1)^{|U|}\theta^{>r_n}_{U^c},
\qquad
U\ne[n].
$$
By Lemma 7.1,
$$
q\in W_{\le d_n}.
$$
Define
$$
\xi_U=(-1)^{|U|}G_{U^c},
\qquad
\mu_U=\nu_{U^c}.
$$
Then \(\xi\) is a uniform random sign vector on \(\Omega_n^\circ\), \(\mu\) is a probability measure on \(\Omega_n^\circ\), and
$$
\xi\cdot\mu\in \mathcal C_\xi.
$$
Moreover,
$$
|q-\xi\cdot\mu|_1
|\theta^{>r_n}-\theta|_1
|\theta^{\le r_n}|_1
\le
\mathfrak m_n^*B_{D_n,G}(\nu).
$$
By assumption (1),
$$
d_n=n-r_n<
\left(\frac12-\varepsilon\right)n
$$
for all sufficiently large (n). Therefore
$$
M_n/N_n\le2^{-\alpha n}
$$
for some \(\alpha>0\). By Lemma 9.1, with high probability,
$$
|\Pi_{W_{\le d_n}}\xi|_\infty\le\tau_n,
$$
where
$$
\tau_n=O\left(\sqrt{\frac{M_nn}{N_n}}\right)=2^{-\Omega(n)}.
$$
On this high-probability event, Lemma 8.1 gives
$$
\operatorname{dist}_{\ell^1}(W_{\le d_n},\mathcal C_\xi)
\ge
\frac{1-\tau_n}{1+\tau_n}.
$$
Thus, uniformly for every \(\nu\),
$$
\mathfrak m_n^*B_{D_n,G}(\nu)
\ge
\frac{1-\tau_n}{1+\tau_n}.
$$
Equivalently,
$$
B_{D_n,G}(\nu)
\ge
\frac{1-\tau_n}{1+\tau_n}\cdot\frac1{\mathfrak m_n^*}.
$$
Since
$$
A_G(\nu)\ge -1,
$$
Proposition 5.1 yields
$$
\eta_{D_n}(G_n)
\min_\nu(A_G(\nu)+B_{D_n,G}(\nu))
\ge
-1+
\frac{1-\tau_n}{1+\tau_n}\cdot\frac1{\mathfrak m_n^*}.
$$
This proves the theorem. \(\square\)
Corollary 10.2. Saturation criterion
Under the assumptions of Theorem 10.1, if
$$
\frac1{\mathfrak m_n^*}\to\infty,
$$
then
$$
\Pr(\gamma_{D_n}(G_n)=1)\to1.
$$
Proof
Theorem 10.1 gives
$$
\eta_{D_n}(G_n)\to\infty
$$
with high probability. In particular,
$$
\eta_{D_n}(G_n)\ge1
$$
with high probability. The empty point has margin exactly (1) by choosing
$$
a_\varnothing=G_\varnothing.
$$
Hence the full margin satisfies
$$
\gamma_{D_n}(G_n)\ge1.
$$
Since always
$$
\gamma_{D_n}(G_n)\le1,
$$
we get
$$
\gamma_{D_n}(G_n)=1
$$
with high probability. \(\square\)

## 11. Linear-degree theorem and optimal off-origin slack
Let
$$
H_2(t)=-t\log_2t-(1-t)\log_2(1-t)
$$
be the binary entropy function. Let (\rho_\in(1/2,1)) be the unique solution of
$$
H_2(\rho_*)=\rho_*.
$$
Since (H_2(t)-t) is strictly decreasing on ((1/2,1)), positive at \(t=1/2\), and negative at \(t=1\), this solution is unique. Numerically,
$$
\rho_*=0.7729078047\ldots,
\qquad
\frac1{2\rho_*}=0.6469076867\ldots.
$$
Theorem 11.1. Optimal off-origin slack in the linear regime
Let \(D_n\) be an integer sequence satisfying
$$
0<\liminf_{n\to\infty}\frac{D_n}{n}
\le
\limsup_{n\to\infty}\frac{D_n}{n}
<\infty,
$$
and
$$
\liminf_{n\to\infty}\frac{D_n}{n}>
\frac1{2\rho_*}.
$$
Then, for uniformly random
$$
G_n:{0,1}^n\to{\pm1},
$$
one has, with high probability,
$$
\eta_{D_n}(G_n)=D_n-1-o(1).
$$
Consequently,
$$
\Pr(\gamma_{D_n}(G_n)=1)\to1.
$$
Proof
Let
$$
c_-=\liminf_{n\to\infty}\frac{D_n}{n}.
$$
By hypothesis,
$$
c_->\frac1{2\rho_*}.
$$
Choose \(c_0\) such that
$$
\frac1{2\rho_*}<c_0<c_-.
$$
Then, for all sufficiently large (n),
$$
D_n\ge c_0 n.
$$
Choose \(\beta\) satisfying
$$
\frac12<\beta<\min(1,\rho_*c_0).
$$
Set
$$
r_n=\lfloor\beta n\rfloor.
$$
Then
$$
r_n\le n
$$
for all large (n). Since \(\rho_*<1\),
$$
\beta<\rho_*c_0<c_0,
$$
and therefore
$$
r_n\le D_n
$$
for all large (n). Also,
$$
\frac{r_n}{n}\to\beta>\frac12.
$$
Choose \(\rho_0\) such that
$$
\frac{\beta}{c_0}<\rho_0<\rho_*.
$$
Then, for all sufficiently large (n),
$$
\frac{r_n}{D_n}\le \rho_0.
$$
We estimate
$$
\mathfrak m^*(D_n,r_n)
\max_{1\le s\le r_n}
\frac{2^s-1}{\binom{D_n}{s}}.
$$
At \(s=1\),
$$
\frac{2^1-1}{\binom{D_n}{1}}
\frac1{D_n}.
$$
For \(s\ge2\), define
$$
\alpha_s=\frac{2^s}{\binom{D_n}{s}}.
$$
Then
$$
\frac{2^s-1}{\binom{D_n}{s}}\le \alpha_s.
$$
Moreover,
$$
\frac{\alpha_{s+1}}{\alpha_s}
\frac{2(s+1)}{D_n-s}.
$$
This ratio is increasing in (s). Hence the sequence \(\alpha_s\) decreases and then increases, so on the interval \(2\le s\le r_n\) its maximum is attained at one of the endpoints \(s=2\) or \(s=r_n\).
At \(s=2\),
$$
\alpha_2
\frac4{\binom{D_n}{2}}
O(D_n^{-2})
<
D_n^{-1}
$$
for all sufficiently large (n).
It remains to control \(s=r_n\). Put
$$
t_n=\frac{r_n}{D_n}.
$$
We have
$$
t_n\le \rho_0<\rho_*.
$$
Since (D_n=O(n)) by hypothesis and \(r_n\sim\beta n\), there is a constant \(t_0>0\) such that
$$
t_n\ge t_0
$$
for all sufficiently large (n). Therefore \(t_n\) lies in a compact subinterval of (\(0,\rho_*\)). Hence there exists \(\delta>0\) such that
$$
H_2(t_n)-t_n\ge \delta
$$
for all sufficiently large (n).
By Stirling's formula, uniformly in this compact range,
$$
\binom{D_n}{r_n}
2^{D_nH_2(t_n)+o(n)}.
$$
Thus
$$
\frac{2^{r_n}}{\binom{D_n}{r_n}}
2^{D_nt_n-D_nH_2(t_n)+o(n)}
2^{-D_n(H_2(t_n)-t_n)+o(n)}
2^{-\Omega(n)}.
$$
Consequently,
$$
\mathfrak m^*(D_n,r_n)=\frac1{D_n}
$$
for all sufficiently large (n).
The hypotheses of Theorem 10.1 are satisfied. Moreover,
$$
\tau_n=2^{-\Omega(n)}.
$$
Since (D_n=O(n)),
$$
D_n\tau_n=o(1).
$$
Therefore Theorem 10.1 gives
$$
\eta_{D_n}(G_n)
\ge
\frac{1-\tau_n}{1+\tau_n}D_n-1
D_n-1-o(1).
$$
It remains to prove the matching upper bound. Normalize \(G_\varnothing=1\). The singleton signs
$$
G_{{1}},\dots,G_{{n}}
$$
are independent uniform signs. With probability \(1-2^{-n}\), at least one singleton has sign (-1). Choose such an (i).
For any feasible polynomial with
$$
a_\varnothing=1,
$$
we have
$$
p(1_{{i}})=1+a_{{i}},
\qquad
|a_{{i}}|\le D_n.
$$
Since \(G_{{i}}=-1\), the margin at this point is
$$
G_{{i}}p(1_{{i}})
-(1+a_{{i}})
\le
D_n-1.
$$
Thus, with high probability,
$$
\eta_{D_n}(G_n)\le D_n-1.
$$
Combining the lower and upper bounds,
$$
\eta_{D_n}(G_n)=D_n-1-o(1)
$$
with high probability.
Since \(D_n\to\infty\), this implies
$$
\eta_{D_n}(G_n)\ge1
$$
with high probability. Therefore
$$
\gamma_{D_n}(G_n)=1
$$
with high probability. \(\square\)

## 12. Homogeneous-form version
Theorem 11.1 has an equivalent homogeneous formulation.
Let \(D_n\) be a linear degree sequence satisfying
$$
0<\liminf_{n\to\infty}\frac{D_n}{n}
\le
\limsup_{n\to\infty}\frac{D_n}{n}
<\infty
$$
and
$$
\liminf_{n\to\infty}\frac{D_n}{n}>
\frac1{2\rho_*}.
$$
Then, with high probability over uniformly random \(G_n\), there exists a homogeneous form
$$
F\in \mathbb{R}[X_0,\dots,X_n]_{D_n}
$$
whose homogeneous coefficients all lie in ([-1,1]), such that
$$
G_n(0,\dots,0)F(1,0,\dots,0)=1
$$
and
$$
G_n(x)F(1,x)
\ge
D_n-1-o(1)
$$
for every nonzero
$$
x\in{0,1}^n.
$$
In particular,
$$
G_n(x)F(1,x)>0
\qquad
\forall x\in{0,1}^n
$$
with high probability.
This follows directly from Theorem 11.1 and the exact realization of the coefficient box by homogeneous forms from Section 2.

## 13. A pseudorandom variant
The proof uses randomness only through the projection estimate
$$
|\Pi_{W_{\le d}}\xi|_\infty=o(1).
$$
This estimate also holds for sufficiently high-wise independent signs.
Proposition 13.1. (O(n))-wise independence suffices for the projection step
Fix \(\varepsilon>0\), and let
$$
d\le\left(\frac12-\varepsilon\right)n.
$$
Let
$$
\xi\in{\pm1}^{\Omega_n^\circ}
$$
be (k)-wise independent with
$$
k\ge C_\varepsilon n
$$
for a sufficiently large constant \(C_\varepsilon\). Then
$$
|\Pi_{W_{\le d}}\xi|_\infty=o(1)
$$
with high probability.
Consequently, the saturation and off-origin slack conclusions above remain valid under any sign distribution for which, after normalizing the origin, the induced sign vector
$$
\left((-1)^{|U|}G_{U^c}\right)_{U\in\Omega_n^\circ}
$$
is (O(n))-wise independent.
Proof
Let (P') be the projection matrix onto \(W_{\le d}\). As in Lemma 9.1,
$$
\sum_y(P'_{xy})^2=P'{xx}\le C_0\frac{M}{N},
$$
where
$$
M=\binom{n}{\le d},
\qquad
N=2^n.
$$
Since
$$
d\le\left(\frac12-\varepsilon\right)n,
$$
there is \(\alpha>0\) such that
$$
M/N\le2^{-\alpha n}.
$$
For fixed (x),
$$
(\Pi\xi)(x)=\sum_yP'_{xy}\xi_y.
$$
Because \(\xi\) is (k)-wise independent, its moments up to order (k) agree with those of fully independent signs. For even (k), the Khintchine moment bound gives
$$
\mathbb{E}|(\Pi\xi)(x)|^k
\le
(C\sqrt{k})^k
\left(\sum_y(P'_{xy})^2\right)^{k/2}.
$$
Thus
$$
\mathbb{E}|(\Pi\xi)(x)|^k
\le
(C\sqrt{k})^k
\left(C_0\frac{M}{N}\right)^{k/2}.
$$
Let
$$
t=A\sqrt{\frac{Mn}{N}}.
$$
By Markov's inequality,
$$
\Pr(|(\Pi\xi)(x)|>t)
\le
\left(\frac{C\sqrt{k}}{A\sqrt n}\right)^k.
$$
Taking
$$
k=C_1n
$$
and choosing \(A,C_1\) so that the right-hand side is at most \(2^{-3n}\), a union bound over at most \(2^n\) points gives
$$
\Pr(|\Pi\xi|_\infty>t)\le2^{-2n}.
$$
Since
$$
t=A\sqrt{\frac{Mn}{N}}=o(1),
$$
the result follows. \(\square\)

## 14. Toward integer and ternary lifts
The results in this paper are over real coefficients. They do not assert the existence of integer or ternary homogeneous coefficient representations.
Let
$$
Z_{T,S}=\mathbf 1_{S\subseteq T}
$$
be the Boolean zeta matrix, restricted to columns \(|S|\le D\). A rounding theorem converting real coefficients inside the box to integer coefficients while preserving signs would imply ternary homogeneous lifts: every integer coefficient
$$
b_S\in[-\binom D{|S|},\binom D{|S|}]
$$
can be written as a sum of \(\binom D{|S|}\) elements of \({-1,0,1}\), which can then be distributed among the homogeneous monomials reducing to \(x_S\).
The optimal off-origin slack
$$
D-1-o(1)
$$
shows that the real solution has large non-origin margin. However, this margin is only linear in (D), and it is not by itself a rounding theorem. Universal, independent, or level-wise rounding estimates are not supplied by the present argument. A discrete version would require new correlated rounding methods or a direct lattice construction.

## 15. Scope and limitations
The main theorem is a real-coefficient result. It does not imply integer, ternary, or rounded homogeneous coefficient representations.
The constant
$$
\frac1{2\rho_*}=0.6469076867\ldots
$$
is a threshold of the present method, not claimed to be optimal. The proof requires a truncation level
$$
r>n/2
$$
so that the complementary polynomial space has exponentially small dimension relative to \(2^n\), and also requires
$$
r/D<\rho_*
$$
so that the sharp weighted-zeta localization parameter
$$
\mathfrak m^*(D,r)
\max_{1\le s\le r}
\frac{2^s-1}{\binom D s}
$$
is dominated by the singleton level (1/D). These two inequalities combine to force
$$
D>\frac n{2\rho_*}.
$$
The theorem is stated in the linear regime (D_n=\Theta(n)). This is the regime in which the method yields the asymptotically sharp off-origin margin
$$
D_n-1-o(1).
$$
For more rapidly growing \(D_n\), the general criterion of Theorem 10.1 remains valid, but the additive error term must be tracked separately.
Classical random threshold-degree results concern unbounded real coefficients. The present theorem concerns a specific bounded coefficient body arising from homogeneous height-one lifts. It is therefore a bounded-coefficient random representation theorem.

## 16. Summary of the argument
The proof may be summarized as follows.
A homogeneous degree-(D), height-one real lift induces exactly the multilinear box
$$
|a_S|\le \binom D{|S|}.
$$
The off-origin margin has the exact dual form
$$
\eta_D(G)
\min_\nu
\bigl(A_G(\nu)+B_{D,G}(\nu)\bigr),
$$
where \(B_{D,G}\) is a weighted upward-zeta norm.
For every dual measure \(\nu\), the low-level Möbius inverse of
$$
\theta_T=\nu_TG_T
$$
satisfies
$$
|\theta^{\le r}|_1
\le
\mathfrak m^*(D,r)B_{D,G}(\nu).
$$
Removing this low-level part leaves high-zeta data. After complementing subsets and applying a parity sign, this high-zeta data becomes a low-degree polynomial of degree at most (n-r).
If
$$
r>n/2+\varepsilon n,
$$
then the degree-((n-r)) polynomial space has exponentially small dimension relative to the cube. A random signed simplex is then \(\ell^1\)-separated from that subspace.
Therefore
$$
\mathfrak m^*(D,r)B_{D,G}(\nu)\ge1-o(1)
$$
uniformly in \(\nu\).
In the linear regime \(D=cn\), with
$$
c>\frac1{2\rho_*},
$$
one can choose \(r>n/2\) with
$$
r/D<\rho_*.
$$
In this range,
$$
\mathfrak m^*(D,r)=\frac1D.
$$
Hence
$$
B_{D,G}(\nu)\ge D-o(1)
$$
uniformly in \(\nu\), and since
$$
A_G(\nu)\ge-1,
$$
one obtains
$$
\eta_D(G)\ge D-1-o(1).
$$
A matching upper bound (D-1) holds with high probability because, after normalizing \(G_\varnothing=1\), at least one singleton has sign (-1) with high probability.
This proves
$$
\eta_{D_n}(G_n)=D_n-1-o(1)
$$
and therefore
$$
\gamma_{D_n}(G_n)=1
$$
with high probability.

## References
[AF93] N. Alon and Z. Füredi, Covering the cube by affine hyperplanes, European Journal of Combinatorics 14 (1993), 79--83.
[BCPS18] A. Bishnoi, P. L. Clark, A. Potukuchi, and J. R. Schmitt, On zeros of a polynomial in a finite grid, Combinatorics, Probability and Computing 27 (2018), 310--333.
[BV19] P. Baldi and R. Vershynin, Polynomial threshold functions, hyperplane arrangements, and random tensors, SIAM Journal on Mathematics of Data Science 1 (2019), 699--729.
[Mur71] S. Muroga, Threshold Logic and Its Applications, Wiley-Interscience, 1971.
[OD14] R. O'Donnell, Analysis of Boolean Functions, Cambridge University Press, 2014.
[OS08] R. O'Donnell and R. A. Servedio, Extremal Properties of Polynomial Threshold Functions, Journal of Computer and System Sciences 74 (2008), 298--312.
