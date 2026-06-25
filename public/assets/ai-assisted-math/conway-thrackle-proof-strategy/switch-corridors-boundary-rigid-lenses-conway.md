# Switch Corridors and Boundary-Rigid Lenses in Even Dumbbell Thrackles: A Router Reduction and Minimal-Witness Strategy

## Abstract

We develop a typed router reduction for the irreducible even-dumbbell stage of Conway's thrackle program. Starting from a non-$T_3$ even dumbbell thrackle, the domain-incidence graph supplies a same-cycle pair of ordinary vertices $p,q$ carrying the relevant obstruction data. From this pair one constructs anchored carriers, proves a complexity-controlled no-backtracking theorem, and compiles minimal reachability data into ordered typed switch corridors. The corridor regularization step then reduces every nonregular output to a terminal contradiction, a strict descent, or a named downstream router. The common vertex is controlled by a rank-one marker ledger; support-gate disks containing original vertices are handled through ported-disk and blocked-R3 machinery; and edge-removal or replacement moves are admitted only with finite certificates. The resulting blueprint has an internal minimal-witness closure theorem: with respect to a single well-founded witness complexity, every unresolved package terminates, strictly descends, enters a lower active router, or is rejected as a whole-witness non-descent. The remaining work is to write the router chain in final manuscript order, attach the stated certificates to every terminal move, and connect the internal theorem to the external reductions in the standard Conway-thrackle program.

## 1. Overview of the Reduction

The target of this paper is the internal even-dumbbell step in the usual strategy for Conway's thrackle conjecture. The external route has the form

$$
\text{Conway false}
\Rightarrow
\text{even dumbbell thrackle}
\Rightarrow
\text{irreducible even dumbbell thrackle}
\Rightarrow
T_3
\Rightarrow
\text{Conway bound}.
$$

The external reductions and the theorem that $T_3$-thrackles satisfy the Conway bound are not reproved here. The contribution is a detailed router architecture for the internal assertion:

$$
\text{there is no irreducible non-}T_3\text{ even dumbbell thrackle surviving the audited blueprint.}
$$

The reduction is organized around five output types.

| type | meaning | allowed use |
| --- | --- | --- |
| $T$ | terminal contradiction | contradicts the thrackle condition, non-$T_3$ status, or irreducibility by a certified theorem |
| $D$ | strict descent | produces a witness package of strictly lower $\mathfrak K^\ast$ |
| $R$ | productive router | enters a named downstream router without losing typed data |
| $C$ | certificate test | becomes $T$, $D$, $R$, or $N$ after a finite certificate check |
| $N$ | whole-witness non-descent | rejected; it is never counted as proof progress |

This taxonomy is part of the proof. A routed output is not a contradiction merely because it has been named. It must be sent to its downstream router, certified, or shown to lower the declared complexity. A certificate test is not terminal until the finite certificate has been checked. A whole-witness non-descent is bookkeeping, not progress.

The main internal theorem is stated in Section 10. Its proof uses one complexity ledger throughout, so that the different local minimalities of the construction cannot cycle.

## 2. Witness Packages as a Presentation System

We now fix the presentation-complexity language used by the proof. This is the point at which the different local minimalities in the construction are replaced by one global well-founded cost. After this section, a phrase such as "smaller corridor", "smaller blocker", or "proper endpoint object" is admissible only when it is interpreted as a strict decrease in the resource scale defined below, or as a handoff to an active obligation of strictly lower ledger rank.

### 2.1. The Conway obstruction presentation system

Let $\mathcal X_{\mathrm{Con}}$ be the class of typed Conway obstruction packages considered up to PL homeomorphism preserving all graph, side, orientation, domain, support, gate, marker, anchor, port, and replacement labels. A description of such a package is a finite planarized combinatorial encoding

$$
d=
(T,p,q,\gamma_0,\gamma_1,C,\mathcal L,\mathcal M,\mathcal D,\mathcal B,\mathcal O).
$$

The entries have the following roles. The drawing $T$ is the planarized even dumbbell drawing. The vertices $p,q$ are same-cycle ordinary vertices supplied by the domain graph. The paths $\gamma_0,\gamma_1$ are the two complementary $p$-to-$q$ paths. The carrier $C$ is an anchored carrier, ordered corridor, support-gate carrier, or the local carrier currently being evaluated. The finite layered graph $\mathcal L$ records typed reachability states. The marker ledger $\mathcal M$ records the rank-one common-vertex marker data. The routed disk $\mathcal D$ is the current support-gate, ported, endpoint, or dirty-boundary disk, when one is active. The blocker relation $\mathcal B$ records blocked R3 and replacement obligations. Finally, $\mathcal O$ is the finite multiset of active router obligations still requiring evaluation.

Let $\mathcal D_{\mathrm{Con}}$ be the class of all such finite descriptions satisfying the local typing rules. The realization map

$$
\rho_{\mathrm{Con}}:\mathcal D_{\mathrm{Con}}\longrightarrow \mathcal X_{\mathrm{Con}}
$$

forgets the chosen encoding and keeps the realized typed obstruction package. The presentation system is

$$
\Gamma_{\mathrm{Con}}
=
(\mathcal D_{\mathrm{Con}},\rho_{\mathrm{Con}},\kappa_{\mathrm{Con}}),
$$

where the cost $\kappa_{\mathrm{Con}}$ is the value $\mathfrak K^\ast$ defined below. Thus the relevant bounded part is

$$
\mathcal X_{\Gamma_{\mathrm{Con}}}^{\le b}
=
\rho_{\mathrm{Con}}\{d\in\mathcal D_{\mathrm{Con}}:\mathfrak K^\ast(d)\le b\}.
$$

A description is **unresolved** if it realizes a nonterminal proof-obstruction package and has at least one active obligation not yet evaluated by the router catalogue. Terminal contradictions, certified descents, and inert whole-witness rejections are not unresolved states.

### 2.2. The resource scale

The base scale is the lexicographic product

$$
B_{\mathrm{base}}=\mathbb N_{\mathrm{lex}}^{12}.
$$

For a description $d$ write

$$
\kappa_0(d)=
(G,M,A,R,H,S,E,Q,L,P,\mathsf B_{\mathrm{blk}},U).
$$

The coordinates are, in order:

1. $G$: global obstruction size, for example the original vertex/edge size of the even dumbbell drawing;
2. $M$: marker complexity at the common vertex;
3. $A$: anchor defect, measuring loss or displacement of the original $p,q$ anchoring;
4. $R$: unresolved reachability or backtracking defect count;
5. $H$: Reeb-height or sweep-event complexity of essential lanes;
6. $S$: layered typed state count;
7. $E$: carrier edgelet or planarized crossing count;
8. $Q$: support-gate loop complexity;
9. $L$: train or alternating-cell complexity;
10. $P$: ported-disk complexity, including ordinary original vertices and boundary ports;
11. $\mathsf B_{\mathrm{blk}}$: blocker complexity for R3 and replacement candidates;
12. $U$: residual finite tie-breaker.

The symbol $\mathsf B_{\mathrm{blk}}$ is deliberately not denoted $B_0$, because $B_{\mathrm{base}}$ is the base resource scale. This avoids a collision between the scale and the blocker coordinate.

There are two further families of local certificate ranks. Let $\Delta$ be the well-founded rank set used by certified-diagonal-free alternating enclosures, with rank $\delta(P_i)$ for the $i$-th active enclosure. Let $\mathcal R_{\mathrm{rep}}$ be the well-founded rank set used by pending replacement-edge or R2 obligations, with rank $\varrho(R_j)$ for the $j$-th active replacement obligation. These ranks are local certificate ranks: they are not observables by themselves, but finite data attached to the corresponding active certificate problem.

For a well-founded ordered set $A$, write

$$
\operatorname{MSet}_{\mathrm{fin}}(A)
$$

for the finite-multiset extension of $A$. The witness cost before router obligations is

$$
\mathfrak K(d)=
\bigl(
\kappa_0(d),
\{\!\{\delta(P_i)\}\!\},
\{\!\{\varrho(R_j)\}\!\}
\bigr)
\in
B_{\mathrm{base}}
\times
\operatorname{MSet}_{\mathrm{fin}}(\Delta)
\times
\operatorname{MSet}_{\mathrm{fin}}(\mathcal R_{\mathrm{rep}}).
$$

An active obligation $O\in\mathcal O(d)$ is a typed subobject still requiring evaluation: a B3/B4 routed object, marker endpoint, ported B6 disk, blocked R3 candidate, dirty boundary cycle, B7 certificate candidate, endpoint object, or whole-witness candidate not yet rejected. Its obligation rank is

$$
\lambda(O)=
\bigl(
\operatorname{scope}(O),
\operatorname{kind}(O),
\operatorname{size}(O),
\operatorname{cert}(O)
\bigr)
\in \mathcal A.
$$

Here $\mathcal A$ is a fixed finite lexicographic rank set. The scope coordinate distinguishes proper cells, proper boundary intervals, proper caps, proper routed disks, whole-boundary cycles, and whole-witness candidates. The kind coordinate records the router priority, ordered so that already localized splice/collapse, marker/anchor endpoint, B7 certificate, blocked-R3/B6b, dirty-cycle/B4p, and same-complexity pending states appear in increasing order of danger. The size coordinate is the relevant local finite size. The certificate coordinate records whether the finite certificate is unchecked, checked-routed, checked-certified, or checked-rejected. Checked-rejected whole-witness candidates are removed from $\mathcal O(d)$ rather than kept as active obligations.

The final scale is

$$
B_\ast=
B_{\mathrm{base}}
\times
\operatorname{MSet}_{\mathrm{fin}}(\Delta)
\times
\operatorname{MSet}_{\mathrm{fin}}(\mathcal R_{\mathrm{rep}})
\times
\operatorname{MSet}_{\mathrm{fin}}(\mathcal A),
$$

ordered lexicographically. The final cost is

$$
\mathfrak K^\ast(d)
=
\bigl(
\mathfrak K(d),
\Lambda(d)
\bigr),
\qquad
\Lambda(d)=
\{\!\{\lambda(O):O\in\mathcal O(d)\}\!\}.
$$

**Lemma 2.1 (Well-foundedness of the Conway scale).** The strict order induced by $B_\ast$ is well-founded.

**Proof.** The lexicographic order on $\mathbb N^{12}$ is well-founded. The certificate rank sets $\Delta$, $\mathcal R_{\mathrm{rep}}$, and $\mathcal A$ are finite or finite lexicographic products of natural-number ranks, hence well-founded. The finite-multiset extension of a well-founded order is well-founded. A finite lexicographic product of well-founded orders is well-founded. Therefore $B_\ast$ is well-founded.

### 2.3. Observables versus costs

The following data are observables in the sense of presentation complexity: the $T_3$ domain-cover data, the domain-incidence graph, the boundary relation of a carrier, the marker word, the Reeb graph type of a lane, the blocker dependency graph, and the braid word of a train segment. They may select a router or a certificate test, but they are not descents by themselves.

For example, "the boundary relation is nontrivial" is not a proof step. It becomes a proof step only after the typed subcarrier theorem produces a terminal contradiction, a lower-cost description, or a lower-ranked active obligation. Likewise, "an R3 candidate is blocked" is merely an observation until the blocker router lowers $P$, $\mathsf B_{\mathrm{blk}}$, $U$, $\delta$, $\varrho$, or the active obligation ledger.

### 2.4. Cost-controlled router outputs

A local block is admissible only if every output has one of the following forms.

| type | cost meaning |
| --- | --- |
| $T$ | terminal contradiction; no unresolved description is produced |
| $D$ | strict descent; an unresolved description $d'$ is produced with $\mathfrak K^\ast(d')<\mathfrak K^\ast(d)$ |
| $R$ | productive router; the output is a named downstream obligation, with no loss of typed data, and either lowers $\mathfrak K$ or replaces the active obligation by a finite multiset strictly smaller in the multiset order on $\Lambda$ |
| $C$ | certificate test; a finite check whose every row is $T$, $D$, $R$, or $N$ |
| $N$ | whole-witness non-descent; the attempted object is proved to be the whole active witness, is marked inert, and is never counted as proof progress |

Thus an $R$-output is not a theorem, and a $C$-output is not a theorem. They are promises to continue inside a finite, lower-ranked evaluation problem. An $N$-output is allowed only as a rejection of a whole-witness attempt. It cannot be used to dispose of a proper residual subobject.

Equivalently, each local router is a description-level transfer in the sense of the presentation-complexity framework, but as a strictly descending transfer: every nonterminal transfer must land in a strictly smaller part of the same well-founded scale $B_\ast$.

**Theorem 2.2 (No router cycle).** Assume each invoked local block is admissible in the sense above. Then there is no infinite chain of productive router evaluations starting from a fixed unresolved description.

**Proof.** Consider one nonterminal evaluation step. If it is a $D$-step, then $\mathfrak K^\ast$ strictly decreases. If it is an $R$-step preserving $\mathfrak K$, then one active obligation is replaced by a finite multiset of obligations strictly smaller in the multiset order on $\Lambda$, so again $\mathfrak K^\ast$ strictly decreases. If it is a $C$-step, the finite certificate table reduces it to one of the already listed cases. If it is an $N$-step, the whole-witness candidate is removed from the active ledger and is not available for a later productive step. Hence every productive nonterminal evaluation decreases the well-founded value $\mathfrak K^\ast$. An infinite chain would give an infinite descending sequence in $B_\ast$, contradicting Lemma 2.1.

**Theorem 2.3 (Minimal-witness principle).** Let $\mathcal U\subseteq\mathcal D_{\mathrm{Con}}$ be the set of unresolved descriptions surviving the external reductions to the irreducible non-$T_3$ even-dumbbell case. Suppose that every $d\in\mathcal U$ admits a closed admissible router evaluation: starting from some active obligation of $d$, the router catalogue produces only $T$, $D$, $R$, $C$, and $N$ outputs as above, and every $R$ or $C$ output is sent to its named downstream admissible evaluation. Then $\mathcal U$ is empty.

**Proof.** If $\mathcal U$ were nonempty, Lemma 2.1 would give an element $d_0\in\mathcal U$ of minimal $\mathfrak K^\ast$-cost. Apply the closed admissible evaluation to an active obligation of $d_0$. A terminal output $T$ resolves the obstruction, contradicting $d_0\in\mathcal U$. A strict descent $D$ produces an unresolved description $d'$ with $\mathfrak K^\ast(d')<\mathfrak K^\ast(d_0)$, contradicting the minimal choice of $d_0$. A productive router or certificate output cannot persist forever by Theorem 2.2; its finite downstream evaluation must therefore end in $T$, $D$, or $N$. The first two cases have already been excluded. In the $N$ case the attempted object has been proved to be the whole active witness and is removed as inert; if no active obligation remains, the description is resolved. If another active obligation remains, the description with the inert candidate removed has strictly smaller active ledger, hence strictly smaller final cost, contradicting the minimality of the original choice. Thus $d_0$ cannot be unresolved. This contradiction proves $\mathcal U=\varnothing$.

**Remark 2.4 (Relation with bounded-counterexample arguments).** This follows the bounded counterexample pattern from the presentation complexity framework, with the bound chosen internally. If a bad irreducible non-$T_3$ even-dumbbell obstruction exists, then the bad set has an element of minimal $B_\ast$-cost. The router catalogue is the exclusion theorem for that minimal bounded part: every possible local failure at that bound is terminal, strictly lower, or inert. The role of the remaining sections is therefore precise. They must prove that the geometric B3, B4, B5, B6, B7, and endpoint blocks are admissible routers in the sense of this section.


## 3. Domain-Pair Separation

The first step is purely finite. It extracts the endpoint data used by the later corridor routers, and it does so without invoking any geometric "inner domain" reduction. The output of this section is a B1/B2 setup certificate: a same-cycle pair of ordinary vertices $p,q$ with separated incident-domain pairs, together with the two complementary graph paths between them.

Let $P(T)$ be the planarization of the even dumbbell drawing $T$. Its vertices are the original vertices of the dumbbell together with the crossing vertices. Its faces are called **domains**. The common original vertex is denoted $v$; the remaining original vertices are called **ordinary**. Write $\operatorname{Ord}(T)$ for the set of ordinary original vertices.

For a domain set $S$ and a set $X$ of original vertices, say that $S$ covers $X$ if every $x\in X$ is incident with at least one domain in $S$. The drawing is $T_3$ if some set of at most three domains covers all original vertices, including $v$.

For an ordinary vertex $x$, let

$$
I(x)=\{D_x^-,D_x^+\}
$$

be the two domains incident with the two local sectors at $x$. These two domains are distinct. Indeed, $P(T)$ is a connected Eulerian plane graph: crossing vertices have degree $4$, ordinary original vertices have degree $2$, and the common vertex has degree $4$. Hence its faces admit a two-coloring, and the two local sectors at an ordinary degree-two passage have opposite face colors.

Define the ordinary domain graph $G_D(T)$ as the finite bipartite multigraph whose vertices are the domains of $P(T)$ and whose edges are

$$
e_x=D_x^-D_x^+,\qquad x\in\operatorname{Ord}(T).
$$

Parallel edges are retained, because different ordinary vertices are different covering constraints. The face two-coloring of $P(T)$ is a bipartition of $G_D(T)$.

**Lemma 3.1 (Domain-cover dictionary).** A set of domains $S$ covers the ordinary vertices of $T$ if and only if $S$ is a vertex cover of $G_D(T)$. Consequently the ordinary vertices are coverable by at most $r$ domains if and only if the vertex-cover number $\tau(G_D(T))$ is at most $r$.

**Proof.** The edge $e_x$ of $G_D(T)$ has endpoints exactly the two domains incident with $x$. Thus $S$ covers $x$ exactly when $S$ meets the edge $e_x$. This is precisely the vertex-cover condition, applied to every ordinary vertex.

A **B1 domain certificate** is one of the following finite objects:

| certificate | finite data |
| --- | --- |
| ordinary-domain certificate | a matching of size $4$ in $G_D(T)$ |
| $v$-domain certificate | for every $d\in I_T(v)$, a matching of size $3$ in $G_D(T)-d$ |

Here $I_T(v)$ is the finite set of domains incident with $v$, and $G_D(T)-d$ is obtained by deleting the domain vertex $d$ and all ordinary-domain edges incident with it.

The certificate proves $T\notin T_3$. In the ordinary-domain case, a matching of size $4$ prevents any three-domain cover of the ordinary vertices by Konig's theorem. In the $v$-domain case, any three-domain cover of all original vertices would contain some $d\in I_T(v)$; deleting $d$ would leave a two-domain cover of $G_D(T)-d$, contradicting the stored size-three matching.

**Theorem 3.2 (B1 domain certificate and separated endpoints).** Let $T$ be a non-$T_3$ even dumbbell drawing with common vertex $v$. Then $T$ admits a B1 domain certificate. Moreover the certificate supplies same-cycle ordinary vertices with separated incident-domain pairs:

1. If the ordinary vertices are not coverable by three domains, then $G_D(T)$ has a matching of size at least $4$. Among the four corresponding ordinary vertices, two lie on the same original cycle. For those vertices $p,q$, $I(p)\cap I(q)=\varnothing$.
2. If the ordinary vertices are coverable by three domains, then the obstruction to being $T_3$ is at $v$. For every $d\in I_T(v)$, the graph $G_D(T)-d$ has a matching of size at least $3$. Among the three corresponding ordinary vertices, two lie on the same original cycle. For those vertices $p_d,q_d$, $I(p_d)\cap I(q_d)=\varnothing$ and $d\notin I(p_d)\cup I(q_d)$.

**Proof.** By Lemma 3.1 and Konig's theorem for finite bipartite multigraphs, the minimum number of domains covering the ordinary vertices is the matching number of $G_D(T)$.

Assume first that the ordinary vertices are not coverable by three domains. Then $\tau(G_D(T))\ge 4$, hence $G_D(T)$ has a matching of size at least $4$. The four matched edges correspond to four distinct ordinary vertices whose incident-domain pairs are pairwise disjoint. These vertices lie on the two original cycles of the dumbbell, so two of them lie on the same cycle. Call them $p,q$. Since their matching edges are disjoint, $I(p)\cap I(q)=\varnothing$.

Assume now that the ordinary vertices are coverable by three domains. Since $T$ is not $T_3$, no such three-domain cover can also cover $v$. Fix $d\in I_T(v)$. If $G_D(T)-d$ had a vertex cover $C$ of size at most $2$, then $C\cup\{d\}$ would cover every ordinary vertex: edges incident with $d$ are covered by $d$, and all remaining edges are covered by $C$. It would also cover $v$, because $d$ is incident with $v$. This would make $T$ a $T_3$ drawing, contradiction. Therefore $\tau(G_D(T)-d)\ge 3$, and Konig's theorem gives a matching of size at least $3$ in $G_D(T)-d$.

The three matched ordinary vertices again have pairwise disjoint incident-domain pairs, and none of those pairs contains $d$. Among three vertices on two original cycles, two lie on the same cycle. These are $p_d,q_d$, and they satisfy both displayed conditions.

**Lemma 3.3 (B2 complementary paths).** Let $p,q$ be any same-cycle pair supplied by Theorem 3.2. Then the original cycle containing $p,q$ contains exactly two complementary simple graph paths $\gamma_0,\gamma_1$ from $p$ to $q$. Their union is that cycle and their intersection is $\{p,q\}$. The endpoint data inherited from B1 is

$$
I(p)\cap I(q)=\varnothing,
$$

and, in the $v$-certificate branch, the chosen $v$-domain $d$ is absent from both endpoint pairs.

**Proof.** A simple cycle with two distinct vertices $p,q$ becomes two open path components after deleting $p$ and $q$. Restoring the endpoints gives the two complementary simple $p$-to-$q$ graph paths. The endpoint-domain statements are exactly the matching disjointness statements proved in Theorem 3.2.

**Remark 3.4 (Complexity role of B1/B2).** The domain graph, its matchings, and the $T_3$ cover tests are observables of the planarized drawing. In the presentation-complexity language, B1/B2 are finite setup compilers: they add certified endpoint data to the initial obstruction package. They are not descent steps and do not construct a switch corridor. The images of $\gamma_0,\gamma_1$ may self-interact after planarization; the passage from these paths to an anchored carrier is the B3 problem of the next section.


## 4. Anchored Carriers and the B3 Handoff

B1/B2 supply a same-cycle pair $p,q$ and two complementary graph paths $\gamma_0,\gamma_1$. The role of B3 is to turn one of these finite $p$-to-$q$ traces into either an anchored corridor for B4 or a named lower router. The key correction from the audit is that minimization must preserve the $p,q$ anchors; a smaller local corridor that forgets the original endpoints is not a substitute for the B1/B2 problem.

Fix one of the two complementary paths and call it $\gamma$. Traversing $\gamma$ in the drawing gives a finite planarized walk $\Gamma_\gamma\subset P(T)$. A **terminal section** at $p$ or $q$ is a small transverse interval meeting the trace in the corresponding endpoint germ and carrying the incident-domain pair, side, orientation, endpoint-role, marker, anchor, and replacement labels.

A **typed state** is the full label read on such a section or on an intermediate slicing level:

$$
\sigma=(\operatorname{side},\operatorname{orient},\operatorname{dom},
\operatorname{supp},\operatorname{gate},\operatorname{end},
\operatorname{mark},\operatorname{anch},\operatorname{rep}).
$$

Only full typed states may be compared. In particular, two geometrically equal sections are not identical unless their marker, anchor, endpoint, and replacement data also agree.

**Lemma 4.1 (Finite raw switch trace).** The planarized walk $\Gamma_\gamma$ carries a finite nonconstant lateral-domain sequence from the endpoint data at $p$ to the endpoint data at $q$.

**Proof.** The path $\gamma$ has finitely many graph edges, and each edge is cut by finitely many crossings in the planarization. Hence the planarized walk has finitely many edgelets. Each edgelet has two lateral domains, so the walk determines a finite sequence of lateral-domain pairs. The initial pair is $I(p)$ and the terminal pair is $I(q)$. By B1, $I(p)\cap I(q)=\varnothing$, so the reduced lateral sequence cannot be constant.

### 4.1. Carriers and Reachability

A **typed anchored carrier** for $\gamma$ is a compact PL disk $C$ equipped with:

1. terminal sections $\Sigma_p,\Sigma_q$ identified with the original $p,q$ endpoint sections;
2. a finite planarized trace inside $C$ carrying the relevant part of $\Gamma_\gamma$;
3. the full typed labels on boundary states, slicing states, marker passages, anchor data, and replacement obligations;
4. a full typed boundary relation $\mathcal R_C\subseteq \Sigma_p\times\Sigma_q$ recording which terminal states are connected through the complement of the trace with compatible labels.

The carrier is **anchored** because the terminal sections are part of the data. An operation on $C$ is allowed inside B3 only if it preserves these sections and their full typed endpoint relation, or else exports the failure as an active obligation.

The following finite reachability description is the safe replacement for the old global composition assertion.

**Lemma 4.2 (Layered reachability graph).** Let $C$ be a typed anchored carrier with a generic PL height function $h:C\to[0,1]$ whose level $0$ contains $\Sigma_p$ and whose level $1$ contains $\Sigma_q$. Choose finitely many regular levels separating all critical heights of the refined planar graph. Build a finite graph $\mathcal L(C)$ whose vertices are:

1. typed states on the chosen levels; and
2. relative-domain components inside the strips between consecutive levels.

Join a level-state vertex to a strip-component vertex when the state lies in the closure of the component with matching type. Then two terminal states are related by $\mathcal R_C$ if and only if they lie in the same connected component of $\mathcal L(C)$.

**Proof.** Every path in $C\setminus P(T)$ from one terminal state to another crosses a finite sequence of strips and levels. Recording the component of each strip and the state met on each level gives a path in $\mathcal L(C)$. Conversely, a path in $\mathcal L(C)$ is a finite chain of incidences between level states and strip components; inside each strip component, the two incident states are connected by definition. Concatenating these local connections gives a path in $C\setminus P(T)$ with the same full typed labels. Thus the boundary relation is exactly finite graph reachability.

The reachability graph is not yet an ordered corridor. It allows arbitrary backtracking. The next lemma is the PL mechanism that detects such backtracking and turns it into a routed subobject.

**Lemma 4.3 (PL backtracking subdisk).** Let $\Lambda$ be a relative-domain component participating in an essential boundary relation of a typed anchored carrier $C$. If the essential Reeb graph of $h|_\Lambda$ is not a height-monotone interval from $\Sigma_p$ to $\Sigma_q$, then $C$ contains a compact typed routed subdisk $D$ whose boundary is made of level segments, lane-continuation arcs, carrier-boundary arcs, and support or gate arcs. The subdisk has one of the following types:

1. full typed identity or pure-ear data;
2. same-relation splice data;
3. smaller anchored carrier or smaller support-gate loop;
4. marker or common-vertex data;
5. ordinary-original-vertex ported disk data;
6. B7 replacement, blocked-R3, or certificate data;
7. whole-witness return.

**Proof.** Put $C$, $P(T)\cap C$, and $h$ in generic PL position. After subdividing at all relevant regular levels, the union of the trace, the carrier boundary, and the chosen levels is a finite plane graph.

If the essential Reeb graph is not a monotone interval, then one of the following finite events occurs: an essential branch terminates away from the opposite terminal section, a lane meets the same regular level twice, two essential continuations merge or split, an interval branch has an interior height extremum, or the Reeb graph contains a cycle. In each case choose the first such event in the sweep order and then choose an innermost return.

Equivalently, there is an essential arc $\alpha\subset\overline\Lambda$ whose endpoints lie on the same regular level $h^{-1}(t)$ and whose interior lies on one side of that level. Let $\beta$ be the level segment between the endpoints, subdivided at its intersections with the trace. The closed walk contained in $\alpha\cup\beta$ and the refined plane graph contains an embedded innermost simple cycle. Let $D$ be the disk bounded by that cycle.

The boundary of $D$ consists only of the listed typed pieces: level segments, lane arcs, carrier boundary, and support/gate arcs. Its interior classification is exhaustive. If it contains no graph, marker, original-vertex, or replacement data, it is identity, pure-ear, same-relation, or smaller-carrier data according to its boundary relation. If it contains $v$ or marker transitions, it is B5/B6c data. If it contains ordinary original vertices, it is B6 ported-disk data. If it contains replacement or R3 ledger data, it is B7 data. If the return is the whole active witness rather than a proper subdisk, it is marked as a whole-witness non-descent.

### 4.2. Reduction and No-Backtracking

A carrier is **B3-reduced** if every compact typed subdisk produced by Lemma 4.3 has already been evaluated in the sense of Section 2: full typed identity pieces are deleted, same-relation pieces are spliced, smaller anchored carriers or support-gate loops are installed with lower cost, proper marker/original/replacement pieces are exported as active B5/B6/B7 obligations, and whole-witness returns are marked inert.

**Theorem 4.4 (Complexity-controlled no backtracking).** Let $d$ be a minimal unresolved description with respect to $\mathfrak K^\ast$, and suppose its active B3 carrier is B3-reduced. Then every essential lane in the carrier has height-monotone essential Reeb graph.

**Proof.** Suppose an essential lane is not height-monotone. Lemma 4.3 gives a compact typed routed subdisk $D$.

If $D$ has full typed identity data, deleting it preserves the terminal typed relation and lowers one of the carrier coordinates $R,H,S,E$ or the tie-breaker $U$. If $D$ has same-relation splice data, the splice again preserves the full anchored boundary relation and lowers the same carrier part of $\mathfrak K^\ast$. If $D$ is a smaller anchored carrier or smaller support-gate loop, replacing the active object lowers the corresponding carrier or obligation rank. Each of these contradicts minimality.

If $D$ contains marker, common-vertex, ordinary-original-vertex, replacement, blocked-R3, or certificate data, then $D$ is a proper B5/B6/B7 obligation. That contradicts the assumption that the carrier was B3-reduced unless the obligation has already been exported, in which case B3 has produced a router output rather than an unresolved carrier. If the return is a whole-witness non-descent, it is removed from the active ledger and cannot persist in a minimal unresolved B3 carrier. Therefore no non-height-monotone essential lane remains.

**Theorem 4.5 (Reachability-to-corridor normal form).** Let $C$ be a B3-reduced typed anchored carrier in which every essential lane is height-monotone. Then the essential part of $\mathcal L(C)$ is equivalent, with the same full typed boundary relation, to an ordered typed corridor

$$
\mathcal C=(\Sigma_0,Q_1,\Sigma_1,\ldots,Q_N,\Sigma_N;\tau,R_1,\ldots,R_N),
$$

where $\Sigma_0=\Sigma_p$, $\Sigma_N=\Sigma_q$, the $Q_i$ are the strips between consecutive regular levels, $\tau$ records the full state type, and $R_i$ is the local typed relation in $Q_i$.

**Proof.** By height-monotonicity, an essential lane meets each chosen regular level in the sweep order and does not return to an earlier level. Therefore every essential boundary connection determines a chain

$$
\Sigma_0\sim Q_1\sim \Sigma_1\sim\cdots\sim Q_N\sim \Sigma_N
$$

in the layered reachability graph. Reading the strip components in order gives a compatible sequence of local relations $R_1,\ldots,R_N$.

Conversely, any compatible ordered chain of local strip relations is a path in $\mathcal L(C)$, hence gives a connection in the carrier by Lemma 4.2. Components of $\mathcal L(C)$ not meeting both terminal sections either do not affect the boundary relation, have already been deleted/spliced in the B3-reduced carrier, or have been exported to a downstream router. Thus the essential typed boundary relation of $C$ is exactly the ordered composition of the strip relations, and the displayed data form the required ordered typed corridor.

### 4.3. The Handoff Router

**Theorem 4.6 (B3-to-B4 handoff router).** Let $d$ be a minimal unresolved description after B1/B2 have supplied $p,q$ and $\gamma_0,\gamma_1$. Then B3 has one of the following admissible outputs:

1. $T$: a certified terminal contradiction or certified local terminal move;
2. $D$: an unresolved description $d'$ with $\mathfrak K^\ast(d')<\mathfrak K^\ast(d)$;
3. $R$: an explicit active B5/B6/B7 or endpoint obligation, with full typed data preserved;
4. an ordered $p,q$-anchored typed corridor $\mathcal C$ satisfying Theorem 4.5, which is the input for B4p.

**Proof.** Start with the finite raw trace $\Gamma_\gamma$ from Lemma 4.1. If its image graph has no relevant cycle, a small regular neighborhood gives an anchored carrier whose terminal sections are the original $p,q$ sections. If the image graph has a repeated vertex, repeated state, or relevant cycle, choose an innermost such cycle in the finite plane graph. The disk it bounds is typed. If it is full identity or same-relation data, deleting or splicing it lowers the carrier part of the cost. If it carries marker, ordinary-original-vertex, replacement, blocked-R3, endpoint, or whole-witness data, it is exported to the corresponding active obligation or marked inert. Since the trace is finite and every identity deletion lowers finite carrier size, this process terminates. Its terminal output is either $T$, $D$, $R$, or an anchored carrier.

In the anchored-carrier branch, minimize only among carriers preserving the terminal sections $\Sigma_p,\Sigma_q$ and the full typed endpoint relation, including marker, anchor, endpoint, and replacement ledgers. This anchored restriction is part of the proof: a smaller local subcorridor that forgets $p,q$ is not an allowed replacement.

If anchored minimization finds a preserving deletion, splice, or smaller carrier, the output is $D$. If it finds a proper marker, original-vertex, replacement, blocked-R3, or endpoint object, the output is $R$. In the residual case the carrier is B3-reduced. The no-backtracking theorem then makes all essential lanes height-monotone, and Theorem 4.5 compiles the finite reachability graph to an ordered typed corridor. This is exactly the B4p input.

**Remark 4.7 (Status of B3).** B3 closes the anchored-carrier stage as an admissible router. Its genuine mathematical content is that the proof no longer uses an arbitrary minimal local corridor and no longer uses ordered composition before no-backtracking has been proved. The downstream obligations exported by B3 are the B5/B6/B7 and endpoint routers.


## 5. Typed Corridor Regularization

B4 is the normal-form compiler for the ordered corridors produced by B3. It is invoked only after Theorem 4.6 has supplied a $p,q$-anchored ordered typed corridor

$$
\mathcal C=(\Sigma_0,Q_1,\Sigma_1,\ldots,Q_N,\Sigma_N;\tau,R_1,\ldots,R_N),
$$

with $\Sigma_0=\Sigma_p$, $\Sigma_N=\Sigma_q$, full state type $\tau$, and ordered relation

$$
R_{\mathcal C}=R_N\circ\cdots\circ R_1.
$$

This ordered composition is not assumed for raw disks. It is the output of the B3 no-backtracking and reachability compiler. The role of B4 is to replace such an ordered corridor by a typed regular corridor, or else to output a certified terminal move, a strict descent in $\mathfrak K^\ast$, or a named downstream obligation.

A **critical strip** is a connected component of some $Q_i$ after deleting monotone bands whose full typed boundary relation is identity or same-relation. The strip is **essential** if it changes the support, side, gate order, endpoint role, marker record, or replacement ledger of an essential lane. A corridor is **B4-reduced** if every inessential monotone band, proper identity ear, same-relation splice, and proper same-boundary subcorridor has already been evaluated as a terminal local move, a strict descent, or a named active obligation in the ledger $\Lambda$.

A **typed regular alternating cell** is an embedded $H_{2m}$ cell, with $m\ge2$, equipped with stable typed input and output gates, one-to-one gate continuation, no returning lane, no branching or merging lane, no repeated gate identification, and no hidden marker, original-vertex, endpoint, replacement, identity, or same-relation obligation in its interior. Thus the square-switch $H_4$ is a binary regular cell. The two-gate case $H_2$ is not regular; it must be identity, same-side, lower-cost, or routed.

A corridor is **typed regular** if every essential critical strip is a typed regular alternating cell, distinct cells meet only along full typed gates, no three cells share a gate, terminal gates lie on endpoint sections, and every non-B4 datum has been exported to B5, B6, endpoint discharge, or B7.

**Lemma 5.1 (Critical-strip normal form).** Let $\mathcal C$ be an ordered typed corridor supplied by Theorem 4.6. Then its essential part admits a finite critical-strip decomposition. In a B4-reduced minimal package, every component outside the essential critical strips has already produced a typed identity deletion, same-relation splice, strict descent, or named downstream obligation.

**Proof.** The corridor has finitely many strips $Q_i$, and each strip contains finitely many planarized edgelets, gate states, and critical heights. Subdividing at these heights gives finitely many monotone components. A component whose full typed boundary relation is identity deletes without changing the ambient typed relation and lowers the carrier coordinates $H,S,E$ or the tie-breaker $U$. A component with the same typed relation as the adjacent boundary data splices and lowers the same finite part of $\mathfrak K^\ast$. A component whose typed relation is nontrivial but proper is not discarded; by the definition of B4-reduced it has already been promoted to a lower active carrier or exported as an active B5/B6/B7 or endpoint obligation. What remains is exactly the finite family of essential critical strips.

Call an essential critical strip **bad** if it is nonembedded, nonalternating without an extracted genuine typed lens, an $H_2$ strip, gate-nonregular, or cell-intersection-nonregular. Under the revised convention, a square-switch $H_4$ satisfying the regularity hypotheses is not bad; it is the $m=2$ regular cell.

**Lemma 5.2 (Proper bad-strip router).** Let $K$ be a bad critical strip inside a B4-reduced minimal ordered typed corridor. If $K$ is contained in a proper typed subcorridor, then B4 produces one of the following outputs:

1. a typed identity deletion or same-relation splice;
2. a witness package $d'$ with $\mathfrak K^\ast(d')<\mathfrak K^\ast(d)$;
3. an explicit B5/B6/B7 or endpoint obligation with full typed data preserved.

**Proof.** Choose the smallest consecutive block of strips containing $K$ and all incident gates needed to read its full typed boundary relation. Since the block is proper, its carrier size, state count, height-event count, or finite tie-breaker is strictly smaller than that of the active corridor, unless its relation is empty.

There are three relation cases. If the full typed relation is identity, delete the block; the terminal sections and their labels are unchanged, and $H,S,E$ or $U$ decreases. If the block has the same typed boundary problem as the active corridor, promote it to the active carrier of a new witness package; no earlier coordinate increases, while a carrier coordinate strictly decreases. If the block has different typed boundary data, it is not a contradiction and not a free descent. Its first non-B4 feature is finite: marker or common-vertex data gives B5, ordinary original-vertex data gives B6, endpoint data gives endpoint discharge, and replacement, blocked-R3, or certified edge-removal data gives B7. These alternatives exhaust a proper finite typed block.

**Lemma 5.3 (Global monochromatic corridor router).** Let $\mathcal C$ be a B4-reduced minimal ordered typed corridor with no pending B5/B6/B7 or endpoint obligation. Suppose a nonalternating bad strip is coextensive with the whole active corridor and contains no $v$, marker data, ordinary original-vertex data, endpoint object, replacement data, or blocked-R3 data. Then it routes to typed identity/splice, a same-side gate-path output, a closed-train output, or a strict descent.

**Proof.** After the listed data have been excluded, a monochromatic run is made only of typed support and gate information. If the run meets an endpoint section, then following its same-color continuation cannot encounter a proper lens or proper bad strip; otherwise Lemma 5.2 would apply. Therefore the continuation returns to the same endpoint side before producing a cross-endpoint alternating ladder, or else it closes. The former is the same-side gate-path configuration of Lemma 5.5 below. The latter is a closed train or support-cycle. If the run meets no endpoint section, finiteness and typed gate continuation imply that it is either relation-empty, hence deletable, or a closed same-color component, hence a train/support-cycle. In every case the output is one of the listed router outputs.

**Lemma 5.4 (Short whole-corridor strips).** In a B4-reduced minimal no-pending package, no residual cell-clean whole-corridor $H_2$ remains. A residual cell-clean square-switch $H_4$ satisfying stable gates, one-to-one cross-endpoint continuation, no repeated support, and no hidden marker/original/replacement data is a typed regular binary cell.

**Proof.** An $H_2$ strip has one essential channel between two typed boundary gates. If the two gates lie on the same endpoint side, it is a same-side gate-path output. If they lie on opposite endpoint sides, the channel is a monotone typed band. Its full relation is identity, same-relation, or different endpoint data. The first two cases delete, splice, or lower the active carrier; the third is endpoint or downstream router data, contradicting the no-pending residual hypotheses.

For $H_4$, first remove the nonregular alternatives. Same-side external gates are handled by the same-side gate-path router. Repeated support is handled by the train/support-shift router. Non-one-to-one gate pairing is a typed normality defect. Identity or same-relation boundary data deletes, splices, or lowers $\mathfrak K^\ast$. Hidden marker, ordinary original-vertex, endpoint, replacement, or blocked-R3 data is exported. The only remaining case is the square-switch with four stable typed gates, two on each endpoint side, one-to-one cross-endpoint continuation, no repeated support, and nontrivial alternating square relation. This is precisely an embedded $H_{2m}$ cell with $m=2$, so it is regular under the revised definition.

**Lemma 5.5 (Typed same-side gate-path router).** Let $\mathcal C$ be a B4-reduced typed regular corridor. If an essential gate-graph path has both external endpoints on the same endpoint section, then B4 produces a typed identity deletion, same-relation splice, strict descent, closed-train output, or B5/B6/B7 or endpoint obligation. Consequently, in a minimal no-pending package, no essential same-side path component remains.

**Proof.** If the gate path contains a cycle, that cycle is a closed alternating train. Otherwise the path, together with the interval of the endpoint section between its two external gates, forms a closed walk in the planarized carrier. Choose an innermost simple cycle in this closed walk and call its disk $D$. The disk cannot contain the opposite endpoint section; otherwise the gate path would separate the two terminal sections and would have to carry a cross-corridor continuation, contradicting that both external endpoints lie on the same endpoint section.

Thus $D$ is a proper routed subdisk. If its full typed relation is identity, delete it. If it has the same typed boundary problem, promote it to a lower-cost witness package. If it has same-relation boundary data, splice it. If it contains $v$ or marker data, route to B5. If it contains ordinary original vertices, route to B6. If it contains endpoint data, route to endpoint discharge. If it contains replacement or blocked-R3 data, route to B7. If the part inside $D$ is a smaller closed train, lower the train coordinate $L$. These are exactly the allowed outputs.

For a typed regular corridor, form the finite gate graph whose vertices are stable gates and whose edges are typed cell continuations. An essential component is one that participates in the cross-corridor relation.

**Proposition 5.6 (Gate-graph ladder/train dichotomy).** In a B4-reduced minimal typed regular corridor with no pending routed obligation, every essential gate-graph component is either a cross-endpoint local ladder or a closed alternating train.

**Proof.** In a typed regular cell, every internal gate has one incoming and one outgoing continuation, so the essential gate graph has internal degree $2$. A finite component with a cycle contains a closed alternating train. If an essential component is acyclic, it is a path with external endpoints on endpoint sections. Lemma 5.5 removes the case in which both external endpoints lie on the same endpoint section. Therefore every remaining acyclic essential component connects opposite endpoint sections and is a local ladder.

**Proposition 5.7 (Anchored complementary ladder gluing).** Suppose B3 and B4 applied to the two complementary $p$-to-$q$ paths produce anchored typed regular corridors $\mathcal C_0,\mathcal C_1$, and suppose each contains a local ladder $L_0,L_1$. Then $L_0\cup L_1$ closes to a closed alternating train, unless an endpoint-local typed deletion, same-relation splice, strict descent, endpoint discharge, or B6/B7 obligation is produced at $p$ or $q$.

**Proof.** Let $x$ be one of the ordinary endpoints $p,q$. A small disk about $x$ meets exactly the two incident edge germs of the original cycle. Its complement has two sectors, and these sectors are the two domains in $I(x)$. Since the two graph paths are complementary arcs of the same original cycle, the two ladder ends at $x$ approach through the two complementary sides of that cycle.

If the typed endpoint data match these two sectors, the continuation through $x$ is forced. If they do not match, the mismatch is finite and local. A pure typed ear deletes, a same-relation endpoint splice lowers the carrier, a gate identification or branching defect gives a strict descent or typed splice, ordinary original-vertex data gives B6, endpoint data gives endpoint discharge, and replacement or blocked-R3 data gives B7. Since $p,q\ne v$, no new B5 marker is created at the endpoint itself; if the failure disk reaches $v$, it is no longer endpoint-local and is routed to B5/B6.

After both endpoint pairings are made, every gate in $L_0\cup L_1$ has degree $2$: internal gates by regularity, endpoint gates by the forced two-sector pairing. Therefore the union contains a cyclic gate-graph component, namely a closed alternating train.

**Theorem 5.8 (B4p typed corridor regularization router).** Let $d$ be a minimal unresolved description whose active B3 output is an ordered $p,q$-anchored typed corridor $\mathcal C$. Then B4 has one of the following admissible outputs:

1. $\mathcal C$ is typed regular, and its essential gate-graph components are local ladders or closed alternating trains as in Proposition 5.6;
2. there is a certified terminal/local move or an unresolved description $d'$ with $\mathfrak K^\ast(d')<\mathfrak K^\ast(d)$;
3. there is an explicit B5/B6/B7 or endpoint obligation with full typed data preserved;
4. an attempted whole-corridor or whole-witness object is rejected as an inert non-descent and removed from the active ledger.

**Proof.** Start with the ordered typed corridor supplied by Theorem 4.6, so the relation $R_{\mathcal C}=R_N\circ\cdots\circ R_1$ is meaningful. Apply Lemma 5.1 to obtain the finite critical-strip decomposition.

If a bad critical strip is proper, Lemma 5.2 gives a terminal local move, a strict descent, or a downstream routed obligation. Hence no proper bad strip survives in the residual minimal no-pending branch. If a nonalternating bad strip is whole-corridor, first export any hidden $v$, marker, ordinary original-vertex, endpoint, replacement, or blocked-R3 data. In the remaining pure case Lemma 5.3 routes the global monochromatic corridor to identity/splice, same-side gate path, train, or strict descent. If the whole-corridor bad strip is $H_2$ or $H_4$, Lemma 5.4 removes $H_2$ and promotes the residual square-switch $H_4$ to a regular binary cell.

Gate nonuniqueness, returning lanes, branching or merging, same-side external gate paths, nonregular cell intersections, and triple gate sharing are handled by Lemma 5.5 and by the same proper-subdisk classification used above. Once these outputs are excluded by minimality and no-pending hypotheses, every essential critical strip is an embedded typed alternating cell $H_{2m}$ with $m\ge2$, gate continuation is one-to-one, cells meet only along typed gates, and no hidden non-B4 datum remains. Thus $\mathcal C$ is typed regular. Proposition 5.6 gives the ladder/train dichotomy for its essential gate graph.

All outputs are admissible in the sense of Section 2: terminal/local certified operations resolve the active obligation, strict descents lower $\mathfrak K^\ast$, routed objects enter B5/B6/B7 or endpoint discharge with full type preserved, and whole-witness rejections are removed from $\Lambda$ as inert non-progress. Therefore B4 is closed as an admissible router.

**Remark 5.9 (Complexity role of B4).** B4 is a normal-form compiler inside the bounded-counterexample method. It says that a minimal unresolved ordered corridor cannot keep arbitrary local irregularity: every irregularity is either visible as a finite typed certificate, lowers the presentation cost, or becomes a named lower router. The downstream dependencies are explicit: B3 must supply the ordered corridor, and B5/B6/B7 plus endpoint discharge must evaluate the exported obligations.

## 6. Common-Vertex Parity and Marker Ledger

Let the two even cycles be $A=C_{2a}$ and $B=C_{2b}$, with common vertex $v$. Throughout this section we use the standard topological thrackle convention: adjacent edges meet exactly at their common endpoint and do not also cross elsewhere, while nonadjacent edges meet exactly once in a transverse crossing. The purpose of B5 is local and typed. It excludes the separated rank-zero model at $v$, defines the surviving rank-one marker calculus, and states exactly which marker operations are legal. It is not a terminal proof engine for all marker-containing support-gate objects; those objects are routed to endpoint discharge, B6, or B7 unless a named marker cancellation or descent is supplied.

**Lemma 6.1 (Rotation parity at the common vertex).** Around a sufficiently small circle about $v$, the two $A$-half-edges and the two $B$-half-edges do not alternate. Equivalently, the local cyclic order $A,B,A,B$ is impossible.

**Proof.** Choose a closed disk $D$ around $v$ so small that $D$ meets only the four incident edge germs and contains no other vertex or crossing. Delete the interior of $D$. The cycle $A$ becomes a properly embedded arc $A'$ with endpoints on $\partial D$, and $B$ becomes a properly embedded arc $B'$ with endpoints on $\partial D$.

For two properly embedded arcs in a disk with boundary, the mod-$2$ intersection number is determined by the boundary order of their endpoints: alternating endpoints give odd intersection number, and nonalternating endpoints give even intersection number. This follows by closing one arc along either boundary interval between its endpoints and applying the Jordan curve parity test to the other arc.

Now count intersections of $A'$ and $B'$ in the thrackle drawing. There are $(2a)(2b)$ pairs consisting of one edge of $A$ and one edge of $B$. Exactly four pairs use an edge of $A$ incident with $v$ and an edge of $B$ incident with $v$; these pairs are adjacent at $v$ and, by the standard convention, meet only at $v$, hence contribute no intersection outside $D$. Every other such edge pair is nonadjacent and crosses exactly once outside $D$. Therefore

$$
|A'\cap B'|\equiv (2a)(2b)-4=4(ab-1)\equiv0\pmod 2.
$$

Thus $A'$ and $B'$ meet evenly, so their endpoints on $\partial D$ are not alternating. The order $A,B,A,B$ would make them alternate, contradiction.

**Definition 6.2 (Rank-one sector model).** After Lemma 6.1, the four half-edges may be cyclically ordered, up to reversal and exchanging $A,B$, as

$$
A_1,A_2,B_1,B_2.
$$

Let

$$
S_A=(A_1,A_2),\qquad
S_1=(A_2,B_1),\qquad
S_B=(B_1,B_2),\qquad
S_2=(B_2,A_1).
$$

The same-cycle local passages are ordinary continuations

$$
c_A:S_A\to S_A,\qquad c_B:S_B\to S_B.
$$

The mixed passages through $v$ are singular rank-one transitions and are recorded as markers

$$
m_A:S_2\Rightarrow S_1,\qquad
m_B:S_1\Rightarrow S_2.
$$

The double arrow means that the passage is not an ordinary $v$-free support-switch continuation. It is a typed event at the common vertex and must remain visible in the marker ledger.

A local boundary state near $v$ has the form

$$
\sigma=(\ell,s,\epsilon,\rho,\mu),
$$

where $\ell$ records the local support, gate, lane, or sector; $s$ records side or endpoint role; $\epsilon$ records orientation and coorientation data; $\rho$ records the transported domain/support relation; and $\mu$ is the marker word in the alphabet $\{m_A,m_B\}$, with any endpoint-orientation refinement needed for typed equality. Equality of typed states includes equality of $\mu$.

**Lemma 6.3 (Marker persistence).** Ordinary $v$-free support-switch normalization, ordinary lane continuation, full typed identity deletion, and same-relation splice preserve the marker record. A transition through $v$ cannot be replaced by an ordinary continuation unless a named marker-discharge certificate is supplied.

**Proof.** Ordinary $v$-free moves are supported away from the common vertex, so they do not create, destroy, or alter singular passages through $v$. Ordinary lane continuations are arrows inside the typed state space and therefore preserve the marker coordinate.

A full typed identity deletion is legal only when the entering and exiting typed boundary states agree. Since typed equality includes $\mu$, such a deletion cannot remove an occurrence of $m_A$ or $m_B$. A same-relation splice has the same restriction: the two-terminal typed boundary relation must agree, including marker data. Thus a splice that changes a nonempty marker word into the empty word is not a same-relation splice; it is an additional marker-discharge theorem and must be stated with its own hypotheses.

Consequently, the marker word can change only by a named typed marker cancellation, by a rank-one descent whose decreasing coordinate includes $M$, by endpoint discharge lowering the marker ledger, or by a certified replacement/edge-removal theorem whose certificate explicitly includes the marked sector data.

**Lemma 6.4 (Marker normal form).** In a minimal reduced witness package, every non-discharged local marker endpoint object has primitive word $m_A m_B$ or $m_B m_A$.

**Proof.** A closed marker word alternates because $m_A$ maps $S_2$ to $S_1$ and $m_B$ maps $S_1$ to $S_2$. After choosing the initial mixed sector, it is of the form $(m_A m_B)^r$ or $(m_B m_A)^r$, with $r\ge1$.

If $r>1$, the first return to the starting mixed sector cuts off a proper closed marker subpackage with shorter marker word. By Lemma 6.3, this subpackage cannot be erased by ordinary moves. In a minimal reduced witness, it must therefore be a typed same-relation marker cancellation, a lower marker-complexity witness, a certified B7 operation, or a routed endpoint/B6/B7 object. If none occurs, the original package was not minimal in the marker coordinate $M$. Hence the only local marker endpoint residual has $r=1$.

**Lemma 6.5 (Primitive marker cap-relation table).** Suppose a primitive marker pair is consecutive and cap-eligible: the two marker transitions lie in one normalized $v$-neighborhood, no ordinary carrier segment lies between them, the mixed-sector cap between the marked detour and the short unmarked sector arc contains no graph, endpoint, anchor, or replacement data, and the two terminal states have been normalized. Then the pair cancels as a typed marker-cap cancellation and lowers $M$.

**Proof.** Let $T_i^-,T_i^+$ be the two terminal typed states on a mixed sector $S_i$, and let $u_i:T_i^-\to T_i^+$ be the short unmarked sector arc. The two possible caps are

| marked detour | short arc | relation after deleting markers |
| --- | --- | --- |
| $m_B\circ m_A:T_2^-\to T_2^+$ | $u_2:T_2^-\to T_2^+$ | $u_2$ |
| $m_A\circ m_B:T_1^-\to T_1^+$ | $u_1:T_1^-\to T_1^+$ | $u_1$ |

In each row, the marked detour and the corresponding short arc are the two boundary arcs of a disk contained in the normalized $v$-neighborhood. By cap eligibility, the disk interior contains no graph data, no ordinary carrier segment, no endpoint/anchor mismatch, and no replacement boundary. The two arcs have the same terminal typed states by construction. All non-marker labels in the boundary relation are read at those terminal states and along an empty sector cap, so the only difference between the two boundary relations is the explicit primitive marker word. Removing that word by the named marker-cap operation leaves exactly the short-sector relation $u_i$. This strictly lowers the marker coordinate $M$ and does not increase any earlier coordinate of $\mathfrak K^\ast$.

If any alleged cap row differs after deleting the marker word, then at least one cap-eligibility hypothesis was false. The failure routes as follows.

| source of failure | output |
| --- | --- |
| terminal states do not match | endpoint/anchor defect, lower $A$ or endpoint discharge |
| ordinary carrier segment lies between markers | separated marker object, routed to endpoint/B6/B7 |
| hidden graph or ordinary original-vertex data lies in the cap | B6 routed object |
| support, side, or gate label is unstable | B3/B4 endpoint router or strict descent |
| replacement or blocked-R3 boundary is involved | B7 |

There is therefore no additional purely local "primitive cap-relation mismatch" residual.

**Theorem 6.6 (B5 marker router).** Let a minimal unresolved description contain an active common-vertex marker object. Then B5 has one of the following admissible outputs:

1. a same-cycle ordinary continuation $c_A$ or $c_B$ with marker record preserved;
2. a typed marker-cap cancellation lowering $M$;
3. a strict descent in $\mathfrak K^\ast$;
4. an endpoint, B6, or B7 obligation with full marker, endpoint, anchor, and replacement data preserved;
5. a whole-witness marker return rejected as inert non-progress.

In particular, B5 never licenses replacing $m_A$ or $m_B$ by an ordinary support-switch move without one of these outputs.

**Proof.** Lemma 6.1 excludes the alternating rank-zero local order. Definition 6.2 gives the surviving local sector model: same-cycle passages are the ordinary continuations $c_A,c_B$, while mixed passages are the marked arrows $m_A,m_B$. Lemma 6.3 makes the marker word invariant under all ordinary $v$-free operations, so any legal removal of a marker must be named.

If the marker object has a nonprimitive local closed marker word, Lemma 6.4 cuts off a shorter marker subpackage; minimality then forces terminal cancellation, strict descent, B7 certification, or a routed endpoint/B6/B7 object. If the residual primitive pair is consecutive and cap-eligible, Lemma 6.5 cancels it and lowers $M$. If it is not cap-eligible, the failure table in Lemma 6.5 names the downstream router or descent. If the marker trace is separated by ordinary carrier data, it is not a purely local B5 object; it is an endpoint, near-whole/anchor, B6, or B7 obligation. A whole-witness marker return is recorded as $N$ and removed from the active ledger. All outputs are therefore admissible in the sense of Section 2.

**Remark 6.7 (Scope of B5).** B5 is a safety and normalization block. It proves that the common vertex is singular, that mixed passages must be carried as rank-one marker data, and that local cap-eligible primitive pairs discharge by a named marker-cap cancellation. It does not by itself prove that every marker-containing support-gate disk is terminal; nonlocal marker objects are deliberately exported to endpoint discharge, B6, or B7.

## 7. Support-Gate and Ported-Disk Routers

The central support-gate problem is handled as a router theorem.

**Lemma 7.1 (Cell-clean support-gate disk).** A $v$-free support-gate disk with no original vertices in its interior routes to a typed identity deletion, same-relation splice, smaller support-gate loop, smaller train, direct typed normality contradiction, or lower $\mathfrak K^\ast$.

**Proof.** With no original vertices, $v$-markers, or replacement data inside, the disk is a finite typed carrier. If its two boundary readings agree, deletion or splice is legal because side, orientation, domain, support/gate, endpoint, marker, anchor, and replacement labels all match. If they do not agree, the first mismatch is a typed normality failure or a smaller labelled support-gate loop/train subobject.

**Theorem 7.2 (Ordinary-original-vertex ported disk router).** Let $D$ be a residual $v$-free ported disk containing ordinary original vertices in a minimal witness. Then $D$ produces a terminal contradiction, a certified B7 move, a lower $\mathfrak K^\ast$ witness, endpoint or marker data, a near-whole/whole-capture non-descent, or a $\theta,\delta,\varrho$-rigid whole-boundary dirty cycle that opens back into B4p and endpoint discharge. No independent ordinary-vertex disk residual remains.

**Proof.** First split ported path components by length. Length $0,1,2$ components form a finite short-port table. After exporting certified boundary R3, blocked boundary R3, and endpoint/anchor defects, the remaining relation is the unique ordinary degree-two chain continuation; hence it is a typed continuation/splice or a typed normality failure. Therefore a minimal unresolved disk contains a long path component with an internal R3 candidate.

Choose a blocked R3 candidate of minimal active triangle-content rank $\theta$. If the triangle is empty and the graph path has the required degree-two middle vertices and prescribed crossing, B7 certifies edge removal. If the triangle is blocked, inspect the first blocker. Marker or $v$ data routes to B5/B6c; endpoint or anchor data routes to endpoint discharge; replacement data routes to B7; ordinary original-vertex blockers produce a blocker dependency graph. Every rank-changing blocker arrow lowers $P,B,U$ or an active $\delta/\varrho$ coordinate. Terminal strongly connected components are therefore $\theta$-rigid.

The SCC compiler turns a terminal rigid blocker SCC into an alternating blocker polygon. Certified ears and diagonals route or descend. Geometric-only diagonals are not used as proof cuts. If all ears are dirty, the boundary becomes a $\theta$-rigid certified-diagonal-free full alternating enclosure. The diagonal-obstruction rank $\delta$ removes non-rigid first-blocker returns. Replacement dirt is controlled by $\varrho$. The remaining signature-rigid whole-boundary dirty cycle either has an admissible cut state, in which case it opens to an ordered typed boundary corridor and feeds into B4p, or the failure to cut is already marker, endpoint, replacement, near-whole, whole-capture, normality, or lower-cost data.

**Lemma 7.3 (Near-whole anchor router).** A near-whole capture of one original cycle routes as follows:

| case | output |
| --- | --- |
| captured cycle length at least $6$ | internal R3 candidate, hence certified B7 or B6b/B7 blocker router |
| captured cycle length $4$ | finite two-edge port table |
| ports cap through $v$ | B5 marker endpoint |
| whole original witness | non-descent, not proof progress |

**Proof.** A literal whole-cycle capture contains $v$ and is marker/common-vertex data. A $v$-free near-whole capture of an even cycle of length at least $6$ contains an internal ordinary graph 3-path not using $v$, so it is an R3 interface. The length-$4$ case has the path $x_1x_2x_3$ with ports on $vx_1$ and $x_3v$. Its two boundary R3 candidates are certified empty, blocked, or endpoint-defective; after these are exported, the short-port chain router gives typed continuation/splice or normality failure. A whole-witness capture is rejected as $N$.

## 8. Certified Edge Removal and Replacement

The edge-removal principle used here is the standard three-path criterion: a graph 3-path $x_0x_1x_2x_3$ with degree-two middle vertices and the prescribed crossing between the first and third edges may be reduced when the associated triangular domain is empty of original vertices.

**Lemma 8.1 (B7 obligation normal form).** Every B7 output in a minimal witness falls into exactly one row:

| row | status |
| --- | --- |
| double crossing of the same original support pair | terminal |
| full typed identity, same-relation splice, or typed collapse | strict descent |
| certified R3 edge removal | terminal or lower $G$ |
| blocked R3 candidate | routes to B6b, B5/B6c, B6d, endpoint, or B7 by first obstruction |
| strong replacement certificate with obstruction persistence | terminal or descent |
| uncertified replacement/R2 candidate | pending replacement obligation |

**Proof.** The first row contradicts the thrackle condition. The second is legal only because the full typed boundary relation, including markers, anchors, endpoint roles, and replacement ledger, is unchanged. The third is exactly the edge-removal criterion, with the additional internal requirement that the non-$T_3$ obstruction or a lower witness persists. A blocked triangle routes according to its first obstructing datum. A replacement is terminal only with a strong certificate; otherwise it remains typed boundary data.

A pending replacement obligation is

$$
R=(\partial R,\alpha_R,\beta_R,\tau_R,\omega_R),
$$

where $\alpha_R$ is the old arc, $\beta_R$ the proposed replacement, $\tau_R$ the full typed endpoint data, and $\omega_R$ the first obstruction to certification. Its active rank is

$$
\varrho(R)=
(\operatorname{span}(R),\operatorname{int}(R),\operatorname{obs}(R),
\operatorname{return}(R),\operatorname{bdry}(R)).
$$

**Lemma 8.2 (Strong replacement certification).** If $R$ has a strong replacement certificate, then applying the replacement preserves the thrackle condition and either preserves the relevant non-$T_3$ obstruction while removing $R$, or produces a witness of strictly lower $\mathfrak K^\ast$.

The certificate consists of typed endpoint match; a replacement lens bounded by old arc, new arc, and endpoint caps; no hidden original vertex, marker, anchor, near-whole, whole-capture, or nested replacement data; controlled through-strand crossings; endpoint-germ compatibility; and obstruction persistence.

**Proof.** Pairs of supports not involving the replacement are unchanged. The endpoint match and endpoint-germ compatibility preserve adjacent-edge incidences. Controlled crossings ensure that each nonadjacent support crossing the old arc crosses the new arc in the same prescribed class and does not acquire a second crossing. The no-hidden-data row prevents the replacement from jumping over graph or ledger data. Obstruction persistence supplies either the same typed non-$T_3$ package with $R$ removed or an explicit lower witness.

**Lemma 8.3 (Local replacement-failure router).** A local failure of a strong replacement certificate routes to B4p, B5/B6c, B6b, B6d, nested B7 with lower $\varrho$, endpoint/anchor discharge, double crossing, or lower $\mathfrak K^\ast$.

**Proof.** Inspect the first failed certificate row in the smallest typed region where it is visible. Endpoint mismatch is endpoint or anchor dirt. Absence of a proper replacement lens is a boundary regularization problem. Hidden ordinary vertices give a B6b ported disk. Hidden $v$ or marker data gives B5/B6c. Near-whole data gives B6d. Hidden replacement data gives a nested B7 obligation; if it is proper, its span or first-obstruction rank is smaller. A support meeting the proposed new arc twice is a double crossing when the support pair is the same, and otherwise a B6b blocker configuration.

**Lemma 8.4 (Domain-certificate persistence).** Let an admissible graph-changing even-dumbbell surgery $T\leadsto T'$ have a strong geometric certificate. Suppose a B1 domain certificate for $T\notin T_3$ survives outside the surgery lens: all ordinary certificate vertices survive, their incident domain pairs are preserved by the outside face bijection, and the four $v$-domains are identified in the $v$-certificate case. Then the transported certificate proves $T'\notin T_3$.

**Proof.** In the ordinary case, the transported four matched domain edges remain pairwise disjoint in $G_D(T')$, so $G_D(T')$ has matching number at least $4$ and no three domains cover the ordinary vertices. In the $v$-certificate case, for each $d\in I(v')$ the transported matching of size $3$ in $G_D(T')-d$ prevents a two-domain cover after deleting $d$.

**Lemma 8.5 (Full-propagation output test).** Suppose the outside cover of a residual domain-critical replacement propagates across the entire affected interval and all endpoint caps are compatible. Then all ordinary vertices of $T'$ are covered by at most three transported domains. Exactly one of the following occurs:

1. the transported cover meets $I(v')$, so $T'$ is $T_3$ and the replacement is rejected as non-descending;
2. the cover misses $I(v')$ and every $G_D(T')-d$ has matching number at least $3$, giving a fresh B1 $v$-certificate and graph-level descent persistence;
3. the cover misses $I(v')$ and some $G_D(T')-d$ has matching number at most $2$, so Konig gives a three-domain cover of all original vertices and $T'$ is $T_3$.

**Proof.** Full propagation covers all ordinary vertices of $T'$. If one transported domain is incident with $v'$, the same at-most-three domains cover every original vertex, hence $T'$ is $T_3$. If no transported domain is incident with $v'$, then B1 case 2 is decided by the finite matching tests in the four graphs $G_D(T')-d$.

**Lemma 8.6 (Rejected replacement pullback).** If the full-propagation test rejects because $T'$ is $T_3$, then pulling the three-domain cover of $T'$ back to $T$ either produces a local B5/B6b/B6d/B7 or endpoint router, lowers $\varrho$, or proves the affected interval was the whole active witness and hence a non-descent.

**Proof.** Outside the affected interval the face bijection pulls the cover back to $T$. Since $T\notin T_3$, the pulled-back cover cannot extend across all of $T$. The first obstruction to extension occurs at an ordinary vertex, crossing/through-strand domain change, marker/common-vertex event, endpoint cap, anchor mismatch, near-whole boundary, or replacement ledger boundary. These are precisely B6b, B5/B6c, endpoint/B6d, or nested B7 rows. If no proper first obstruction exists, the affected interval is the whole witness and the attempted replacement is rejected as $N$.

## 9. Endpoint Discharge

Many branches export an endpoint object

$$
E=(\partial E,\tau,\mu,a,\rho),
$$

where $\partial E$ is the typed boundary trace, $\tau$ records side/orientation/domain/support/gate data, $\mu$ is the marker word, $a$ is the anchor state, and $\rho$ is the replacement or blocked-R3 ledger.

The endpoint cost is

$$
\eta(E)=(M_E,A_E,R_E,U_E),
$$

compatible with $\mathfrak K^\ast$.

**Lemma 9.1 (Endpoint normal form).** Before the near-whole router is applied, every non-discharged endpoint object in a minimal reduced witness is one of:

1. a primitive marker pair $m_A m_B$ or $m_B m_A$;
2. an anchor-rigid near-whole cycle capture;
3. a pending B7 replacement/R3 obligation or blocked R3 obligation.

**Proof.** Nonprimitive marker words are reduced by Lemma 6.4. A whole-capture endpoint containing or capping through $v$ is marker data. A $v$-free near-whole endpoint has all ordinary vertices of one original cycle except the two ports near $v$; if it had a proper anchored subobject with the same boundary relation, $A,P$, or $U$ would decrease. Certified empty R3 triangles and strong replacements are B7 terminal/descent rows; blocked or uncertified ones are pending B7 obligations.

**Lemma 9.2 (Productive endpoint discipline).** Evaluating the active B7 candidates of an endpoint object has exactly one productive outcome: certified terminal/descent, local router or lower $\mathfrak K^\ast$, nested B7 with lower $\varrho$, or whole-witness rejection removed from the active endpoint ledger.

**Proof.** Certified R3, typed splice/collapse, carrier-local replacement, and obstruction-persistent graph-changing replacement are B7 terminal or descent rows. Local failures route by Lemma 8.3. Domain-critical discontinuities and rejected replacements route or become whole-witness non-descents by Lemmas 8.5 and 8.6. Nested replacement data lowers the active $\varrho$ multiset unless it is replacement-rigid dirt already recorded in cyclic boundary regularization.

**Lemma 9.3 (No proper inert-only endpoint residual).** After primitive marker normalization, rank-one cap cancellation, near-whole routing, short-port routing, and productive B7 evaluation, a proper endpoint object cannot have all B7 candidates inert and no remaining marker, anchor, B6b, B6d, B7, or typed-continuation output.

**Proof.** Endpoint normal form leaves only primitive marker pairs, anchor-rigid near-whole captures, and B7/blocked-R3 obligations. Primitive consecutive marker pairs cancel by Lemma 6.5; failures of cap eligibility route to separated marker, endpoint/anchor, B5/B6/B7, or lower cost. Near-whole captures route by Lemma 7.3. B7 obligations are productive by Lemma 9.2, and blocked R3 obligations are B6b/B7 outputs by definition.

**Theorem 9.4 (Endpoint discharge router).** Every proper endpoint object routes to terminal/lower $\mathfrak K^\ast$, B5/B6b/B6d/B7 productive routing, anchor repair, typed continuation/splice, or whole-witness non-descent. Endpoint discharge has no independent residual beyond the B6b/B7 routers to which it legitimately exports.

**Proof.** Combine Lemmas 9.1-9.3 with the marker cap table, the near-whole length dichotomy, the short-port router, and the B7 certification ledger. Each proper endpoint either lowers a coordinate, is certified terminal, enters a named downstream router, or is rejected as a whole-witness non-descent.

## 10. Internal Minimal-Witness Closure

**Theorem 10.1 (Internal minimal-witness closure).** Assume there exists an irreducible non-$T_3$ even dumbbell thrackle to which the blueprint applies. Among all unresolved proof-obstruction packages choose one of minimal $\mathfrak K^\ast$. Then no such unresolved package exists.

**Proof.** Lemma 3.1 and the complementary path construction supply $p,q,\gamma_0,\gamma_1$ and hence a witness package. Apply Theorem 4.6. A terminal output contradicts the standing assumptions. A descent contradicts minimality. A B5/B6/B7 output enters the corresponding productive router. Otherwise B3 supplies an anchored ordered typed corridor.

Apply Theorem 5.8. Again terminal and descending branches close. Exported marker, ordinary-vertex, endpoint, replacement, and train/support-gate branches are productive router outputs. The regular corridor branch feeds the ladder/train/support-gate analysis through Propositions 5.6 and 5.7: cell-clean disks are handled by Lemma 7.1; ordinary-vertex disks by Theorem 7.2; marker data by Section 6; endpoint data by Section 9; and edge-removal/replacement data by Section 8.

By Lemma 2.1, any downstream router chain is finite unless it produces a terminal output or a strict descent. Certificate tests are finite B7 or endpoint tests. Rejected whole-witness candidates are marked inert and removed from the active ledger; they cannot be counted as progress. If no active obligation remains, the package is resolved. If an active obligation remains, minimality applies to that obligation and Lemma 2.1 prevents a cycle.

Therefore a minimal unresolved package has no possible final output: terminal contradicts the hypotheses, descent contradicts minimality, productive routing cannot continue indefinitely, and whole-witness non-descent cannot be the final state of a proper unresolved object.

## 11. Remaining Integration Tasks

The proof front is now reduced to clean integration and finite certification.

1. Single complexity ledger. The final manuscript must use $\mathfrak K^\ast=(\mathfrak K,\Lambda)$ from the start. Older symbols such as $\kappa$, $\kappa^\dagger$, and $\kappa^\ddagger$ should appear only as explanatory projections.
2. Clean B3/B4 order. Sections 4 and 5 now enforce the required order: anchored minimization, finite reachability, complexity-controlled no-backtracking, reachability-to-corridor, and only then B4p regularization. No ordered corridor composition may be used before Theorem 4.6.
3. Router integration. The phrases "smaller core", "relevant inner domain", and "uncertified replacement" are not proof steps. They are replaced by B6b short-port routing, blocked-R3 $\theta$-normal form, SCC compiler, diagonal-obstruction transfer, cut-state normal form, B4p cyclic regularization, endpoint discharge, and productive B7.
4. Certificate discipline. Every edge removal, replacement, identity splice, marker cancellation, anchor repair, and whole-witness rejection must carry the corresponding finite certificate.
5. External citations. The final proof must explicitly cite or reprove the reduction from Conway false to an irreducible non-$T_3$ even dumbbell and the theorem that $T_3$-thrackles satisfy Conway's bound.
6. Final audit. After rewriting, every exported B5/B6/B7 output must be checked so that none is treated as terminal without certification, and no step silently changes the $p,q$ anchors, marker ledger, replacement ledger, or active $\theta,\delta,\varrho$ ranks.

The next mathematical work is therefore concentrated in three manuscript targets: the B6 ordinary-vertex router integration, the endpoint/B7 productive ledger integration, and the final certificate audit linking all exported router outputs.

## References

[LPS97] L. Lovasz, J. Pach, and M. Szegedy, *On Conway's thrackle conjecture*, Discrete & Computational Geometry 18(4) (1997), 369-376.

[CN00] G. Cairns and Y. Nikolayevsky, *Bounds for generalized thrackles*, Discrete & Computational Geometry 23(2) (2000), 191-206.

[MN18] G. Misereh and Y. Nikolayevsky, *Annular and pants thrackles*, Discrete Mathematics & Theoretical Computer Science 20(1) (2018), Article #16.

[FP11] R. Fulek and J. Pach, *A computational approach to Conway's thrackle conjecture*, Computational Geometry: Theory and Applications 44(6-7) (2011), 345-355.

[Xu21] Y. Xu, *A new upper bound for Conway's thrackles*, Applied Mathematics and Computation 389 (2021), Article 125573.

## Declaration of generative AI and AI-assisted technologies in the writing process

During the preparation of this work, ChatGPT, by OpenAI, was used to assist with mathematical drafting, formalization, review, and editing. This work is shared as a preliminary AI-assisted mathematical note. The mathematical content may have been only partially reviewed and may contain errors; it should not be treated as peer-reviewed or as a fully verified manuscript.
