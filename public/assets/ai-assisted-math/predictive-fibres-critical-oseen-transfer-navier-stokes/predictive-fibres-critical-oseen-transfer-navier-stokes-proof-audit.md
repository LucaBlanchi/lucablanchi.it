# Predictive Fibres and Critical Oseen Transfer for Navier-Stokes: Conditional Proof Strategy

## Abstract

This page records the current public form of a proof strategy for the three-dimensional incompressible Navier-Stokes regularity problem. The strategy is intentionally presented as a conditional reduction: it proves and organizes a large finite system of local analytic, compactness, accounting, and gate-opening modules, and it names the remaining source theorems that would make the reduction nonconditional.

The original contribution is the presentation-theoretic architecture. A possible singular chain is not treated only as a sequence of cylinders with large critical norm. It is treated as a sequence of finite presentations: incoming observations, admissible predictors, invisible fibres, transported defects, cost ledgers, and legal exits. The proof attempts to show that persistent no-gate badness cannot survive finite repaired cost. Either the fibre is controlled by a predictor and a relative CKN gate opens, or a registered source, escape, update, atom, quotient, or rigidity branch is forced.

The current status is substantial but conditional. Many local modules are closed: relative CKN epsilon regularity, final gate-excess semantics, local Oseen transfer under Serrin drift, fixed dyadic cutoff-collar summability, fixed-drift Oseen collar summability, pressure/gauge and force-native firewalls, corrected zero-cost rigidity through Euler-coherent Stokes branches, Navier-Stokes and normal-defect limit passage under strong convergence, Stokes branch size and gate interfaces, and the CKN witness branch-gate routing layer. The remaining blocks are sharply identified: actual rowwise source closure for the force, pressure, packet, carrier, cutoff/localization, E12 floor, and CKN witness channels; the concrete global residual representation needed by repaired GQ1; and the final assembly that consumes only closed source or gate/escape statuses.

This is therefore best read as a detailed proof blueprint with many proved subtheorems, not as a completed nonconditional solution. The value of the current form is that the proof no longer hides its difficult points behind broad labels such as "compactness", "Hilbert cost", "regular branch", or "pressure error". Each such label has been expanded into a finite certificate interface with explicit inputs, outputs, firewalls, and remaining mathematical burdens.

## 1. Current Status

The current audit is synchronized with the temporary ledger through L406 in `/private/tmp/ns-presentation-audit/02-closed-lemmas.md`.

The estimate I currently assign to the program is:

| Layer | Approximate completion | Meaning |
| --- | --- | --- |
| Block identification | 80-85 percent | Most necessary proof blocks now have names, input packets, output statuses, row matrices, and no-circularity firewalls. |
| Formal conditional closure | 60-70 percent | Many implications of the form "closed certificates imply downstream consumption" are now precise and locally proved. |
| Nonconditional final proof | 35-45 percent | Several hard PDE source theorems, rowwise owner maps, and final GQ1/CKN assembly steps remain open. |
| Overall project | about 55-60 percent | The proof map is now quite advanced; the remaining work is concentrated in the mathematically hardest source closures. |

The article should be read with one convention: "closed" means closed at the level explicitly stated. A formally closed certificate interface may still have open actual row data. This is a strength of the current version, because it prevents an interface theorem from being mistaken for a PDE theorem.

## 2. Original Strategy

The proof strategy starts from a presentation-theoretic reading of local regularity.

At a parabolic cylinder \(Q_R(z_0)\), one distinguishes:

1. incoming and lateral observations;
2. admissible local predictors;
3. the fibre of suitable weak states compatible with those observations;
4. a pressure-sensitive relative CKN distance from a state to a predictor;
5. a repaired cost ledger measuring genuinely new, transported, or source-owned defects;
6. legal exits: gate, escape, reopen, atom, quotient, certified-old state, nonfinal row.

The intended contradiction is not simply "finite energy implies finite critical scale sum", which is false. Critical normalized densities may stay order one along infinitely many nested scales while the underlying measure remains finite. The proof instead tries to count new information: a persistent no-gate row must either open a gate after choosing a valid predictor, or create a registered source cost that is summable by Bessel, packet, Carleson, finite-overlap, monotone, or escape mechanisms.

In this language, a bad block is a presentation state whose compatible fibre still contains a no-gate, CKN-large state. A source theorem is a theorem proving that such a row cannot occur infinitely often for free. It must be paid by a source owner, routed to a gate, or removed by a legitimate exit.

## 3. The Conditional Theorem

The current conditional theorem can be stated as follows.

Assume that every consumed row in the repaired presentation has one of the following final-compatible outcomes:

1. a source-closed summable cost channel;
2. a gate opening on the same reserved inner cylinder used by the final bad-block predicate;
3. a genuine registered escape;
4. a finite update paid before the final source sum;
5. a certified-old, atom, quotient, or recurrent state with well-founded rank;
6. a nonfinal or reopen status not consumed by the final theorem.

Assume also that the global repaired cost satisfies the finite-source contract:

$$
\sum_k Q_k^{rep}<\infty,
$$

where every term in \(Q_k^{rep}\) has a named owner and no term is inserted late under a changed meaning.

Then a persistent no-gate bad chain cannot exist. Indeed, by the final gate-excess defect theorem, no-gate gives a positive predictive defect floor on the reserved inner cylinder. By compactness and the repaired source ledger, infinitely many such floors must either produce summable registered cost, open a relative CKN gate, or trigger a legal escape/update. The first option is incompatible with infinitely many persistent positive floors after the block-selection step; the second option contradicts no-gate; the third option removes the row from the final bad tail. Thus the putative singular chain is eliminated.

The nonconditional proof is obtained exactly when every source, gate, escape, update, and compatibility block listed below is proved row by row.

## 4. Closed Core Analytic Blocks

### 4.1 Relative CKN gate

The relative CKN module is closed. For a smooth predictor \((g,\pi_g)\) on \(Q_r(z_0)\), define

$$
RCKN_r(u,p\mid g,\pi_g)
=r^{-2}\int_{Q_r}|u-g|^3
+r^{-2}\int |(p-\pi_g)-[p-\pi_g]_{B_r}(t)|^{3/2}.
$$

Let \(PCKN_r(g,\pi_g)\) be the usual CKN quantity of the predictor. The triangle inequalities

$$
|u|^3\le C(|g|^3+|u-g|^3)
$$

and

$$
|p-[p]_{B_r}(t)|^{3/2}
\le C\left(|\pi_g-[\pi_g]_{B_r}(t)|^{3/2}
+|(p-\pi_g)-[p-\pi_g]_{B_r}(t)|^{3/2}\right)
$$

show that sufficiently small \(PCKN+RCKN\) implies the classical Caffarelli-Kohn-Nirenberg epsilon criterion. Therefore the relative CKN gate is a genuine local regularity gate, not a new regularity assumption.

### 4.2 Final gate-excess defect

The final predictive defect is defined by a corrected gate functional

$$
\Gamma_M(x,G)
=PCKN(G)+RCKN_{CZ}(x\mid G)+HarmAllow_M+CutGaugeAllow_M+EtaAllow.
$$

The allowances are stored before final row consumption. Define

$$
D_M(x)=\max(0,\inf_G \Gamma_M(x,G)-\epsilon_{safe}).
$$

If \(D_M(x)=0\), the relative CKN gate opens. If no relative CKN gate opens, then \(D_M(x)\ge \delta_{gate}>0\). The proof is compactness of the predictor family plus the inequality \(ActualGate\le \Gamma_M\). This closes the semantic link between bad-block no-gate behaviour and a positive defect floor.

### 4.3 Local Oseen transfer

The local Oseen transfer theorem is closed in its stated range. If \(w=u-g\) is the residual around a Serrin-class drift \(g\), then the localized energy inequality produces the usual Oseen terms. The drift contribution is controlled by Holder, Sobolev, and the Serrin relation

$$
\frac2q+\frac3p=1,\qquad p>3.
$$

The pressure tail is not discarded. It is a named budget term. The theorem therefore proves a local transfer estimate only after the pressure-tail and collar terms are explicitly paid.

### 4.4 Fixed dyadic cutoff collar

For a fixed centered dyadic cutoff family, the derivative weight

$$
W_k=|\partial_t\zeta_k|+|\Delta\zeta_k|+|\nabla\zeta_k|^2
$$

satisfies the pointwise domination

$$
\sum_k W_k \le C(|x-x_*|^{-2}+R^{-2}).
$$

The integrated collar term

$$
\sum_k\int |w|^2 W_k
$$

is therefore finite by local energy, dissipation, and Hardy. This closes the fixed-cutoff Hardy subsource. It does not close moving cutoffs, moving centers, or the full S8 localization channel.

### 4.5 Fixed-drift Oseen collar

On a fixed or finitely merged Serrin-drift epoch, the dyadic drift-gradient collar

$$
\sum_k\int |g|\,|w|^2|\nabla\zeta_k|
$$

is source-closed by Serrin integrability, dyadic Hardy domination, and Sobolev interpolation. The result is a real Oseen/S8 subchannel closure. It is not a closure of the moving-predictor drift channel.

## 5. Closed Compactness and Branch Blocks

### 5.1 Navier-Stokes limit passage

If \(u_n\to U\) strongly in \(L^3_{loc}\) and \(p_n\to P\) strongly in \(L^{3/2}_{loc}\), then

$$
\partial_t u_n-\Delta u_n+\operatorname{div}(u_n\otimes u_n)+\nabla p_n=0
$$

passes to

$$
\partial_t U-\Delta U+\operatorname{div}(U\otimes U)+\nabla P=0
$$

distributionally. The nonlinear term passes because strong \(L^3\) convergence gives \(u_n\otimes u_n\to U\otimes U\) in \(L^{3/2}_{loc}\).

### 5.2 Normal-defect limit passage

The full-state normal defect is localized before being projected. Under strong \(L^3_{loc}\) convergence, the localized quadratic term converges in \(L^{3/2}_{loc}\). Hence vanishing registered normal defect passes to the limit in the native topology. This is essential: a weak packet proxy is not enough to infer Euler coherence.

### 5.3 Euler-coherent Stokes branch

If the limit is Navier-Stokes and its full-state normal defect vanishes, then

$$
P_{Leray}\operatorname{div}(U\otimes U)=0.
$$

Equivalently, there is an Euler pressure \(\Pi_E\) such that

$$
\operatorname{div}(U\otimes U)+\nabla\Pi_E=0.
$$

Subtracting this identity from Navier-Stokes gives

$$
\partial_t U-\Delta U+\nabla(P-\Pi_E)=0,\qquad \nabla\cdot U=0.
$$

Thus the branch is a homogeneous Stokes branch and is smooth in the interior. The branch can open a relative CKN gate only after the branch predictor, shrink, pressure gauge, relative CKN convergence, and margin allowances are certified.

### 5.4 Corrected zero-cost rigidity

The corrected zero-cost rigidity block says: compact NS limit plus vanishing full-state normal defect gives a smooth Stokes branch. It does not classify the branch into Beltrami or two-and-a-half-dimensional forms. That older classification was too narrow. The right intrinsic class is Euler-coherent pure-pressure nonlinearity. This is one of the main structural repairs in the proof.

## 6. Closed Presentation and Cost Blocks

### 6.1 Hilbert innovation accounting

The formal Hilbert innovation mechanism is closed. If transported defects \(d_k\) admit a global representation

$$
d_k=A_kR+\rho_k,
$$

with finite critical source norm for \(R\), Bessel or finite-overlap control of \(A_k^*e_k\), and square-summable errors \(\rho_k\), then the squared orthogonal innovations are summable.

The proof is the standard Hilbert Bessel argument:

$$
\sum_k |\langle R,A_k^*e_k\rangle|^2 \le C\|R\|^2.
$$

What remains open is the concrete Navier-Stokes instantiation of \(R\), \(A_k\), the packet witnesses, and the pressure/force/cutoff/gauge/carrier error terms.

### 6.2 Finite-observable blindness

The finite-observable obstruction is closed. A finite incoming observation map cannot control relative CKN on an infinite-dimensional residual fibre unless its kernel is CKN-null modulo registered gates or escapes. This is the conceptual reason the proof needs source theorems. Naming a finite observation family is not enough.

### 6.3 Repaired GQ1 source contract

The repaired global cost has the form

$$
Q_k^{rep}=Innov_k+Err_k^{rep}+Esc_k^{rep}.
$$

Each term must have a source status before final GQ1 may consume it. A channel is not allowed to enter the finite source sum merely because it has a name. It must be source-closed, gate-opening, escaping, finite-update, certified-old, atomized, reopened, or nonfinal. This source-contract layer is formally closed as a ledger rule.

### 6.4 Pressure, gauge, and force firewalls

Several important firewalls are now closed.

1. A nonconstant pressure-gauge transfer is not free. Only spatial constants on each time slice are gauge-free in CKN quantities.
2. Hilbert force control is not automatically native \(Y_{force}\) control. A transition theorem or owner must pay the native topology.
3. A pressure-force pair cannot be split after the fact without an owner map.
4. A harmonic pressure shrink cannot be chosen after the row is known to close.
5. Escape labels such as `ForceUseEsc=ForceUse` or `EscS8=S8Loc` are not source theorems unless tied to genuine escape, lower-bound, gate, or impossibility semantics.

These are not cosmetic. They prevent the final proof from borrowing from its own conclusion.

## 7. Closed K4 / CKN Witness Layer

The latest audit concentrated on the K4 zero-chart and witness chain. This is now much cleaner.

### 7.1 Nonlinear CKN witness obstruction

The raw CKN witness

$$
RCKNWit_C=RCKN(Q_C';u,p\mid 0,0)
$$

is nonlinear and positive. It is not a vector in the Hilbert defect space \(H_{def}\). It cannot be made summable by declaring a scalar coordinate \(\sqrt{RCKNWit_C}e_C\), because that simply restates the forbidden raw sum

$$
\sum_C RCKNWit_C.
$$

The closed theorem is therefore negative and useful: direct Hilbert insertion of the CKN witness is illegal. A final-compatible witness row needs CW-H1 linear domination, CW-H2 packet decomposition, CW-H3 Carleson/monotone source, CW-H4 rigidity gate, or CW-H5 exit/reopen/nonfinal routing.

### 7.2 Smooth branch gate certificate

Smoothness of a kernel branch does not automatically open the zero-predictor gate. The branch may be nonzero, so its CKN relative to the zero predictor may be large. The proof must switch to the branch predictor, and that switch is a presentation transition.

The certificate `CKNWitBranchGate_C` records:

1. kernel branch;
2. branch type;
3. branch predictor;
4. branch defect status;
5. branch CKN modulus;
6. shrink data;
7. gate margin;
8. relative CKN convergence;
9. pressure/gauge compatibility;
10. cutoff/localization and carrier compatibility;
11. atom/quotient status;
12. well-founded rank;
13. no-zero-predictor shortcut;
14. no-double-counting;
15. no-circularity.

This interface is closed. Actual rowwise branch classification remains open.

### 7.3 Stokes gate to witness promotion

The L402 promotion theorem is closed: a closed `StokesBranchGate_C` can promote `CKNWitBranchGate_C` to

`BRANCH-GATE-CLOSED-STOKES`

only if the Stokes gate and witness certificate use the same branch predictor, gate cylinder, pressure mode, allowance split, E12 footprint, branch defect status, and well-founded rank. This blocks the tempting shortcut "smooth branch, therefore witness solved".

### 7.4 Witness branch-gate source router

The L403 router is closed: a closed branch gate routes to

`CKNWIT-GATE`,

not to a summable source status. In particular,

`BRANCH-GATE-CLOSED-STOKES`

does not imply

`CKNWIT-SOURCE-CLOSED-HILBERT-DOMINATED`.

This distinction is crucial. A gate exits the no-gate tail; it does not prove \(\sum WitnessCost_C<\infty\).

### 7.5 Final gated-row consumption

The L404 final-exit theorem is closed: if `SourceStatus_C = CKNWIT-GATE` and the gate opens on the same reserved inner cylinder used by the final bad-block predicate, then

`RowExit_C = EXIT-BY-RELATIVE-CKN-GATE`

and

`QrepInsertion_C = NO-WITNESS-COST-INSERTION`.

Thus repaired GQ1 may not count a gated witness row as a finite source cost. Final CKN consumes it as local regularity/exclusion.

### 7.6 Stokes size and branch outer-data chain

The Stokes branch size chain is now formally closed as an interface.

1. `ZeroCostBranchInput_C` can produce `StokesOuterData_C` if compactness, strong convergence, NS limit passage, normal-defect vanishing, pressure convention, carrier, cutoff/localization, and gauge status are closed.
2. Closed `StokesOuterData_C` promotes to `StokesBranchSize_C`, producing `UBound_C`, `POscBound_C`, and `M_br_C`.
3. `StokesBranchSize_C` promotes to `PCKNBound_C` for the branch gate once size-to-CKN, switch-chain, pressure-mode, cylinder nesting, and E10/E11/E12 compatibility are closed.

The current first operative blocker in this chain is actual `ZeroCostBranchInput_C`, not the formal Stokes interior estimate.

## 8. K4 Radius, Margin, and E12 Footprint Chain

The branch-radius and E12 footprint layer has been converted into a finite certificate stack.

The closed interfaces include:

1. branch-radius positivity ownership;
2. normalized branch-radius coordinates;
3. analytic radius owner PosOut certificates;
4. geometric radius owner PosOut certificates;
5. radius PosOut cover assembly;
6. K4 margin-slot absorption;
7. E12 block-length dominance;
8. radius-margin-footprint assembly;
9. E12 cost/defect compatibility trichotomy;
10. footprint-to-branch-radius-stack promotion;
11. exact downstream consumption by size-to-switch, relative CKN, and Stokes branch gate.

The important achievement is that downstream consumers cannot mutate K4 data. The same promoted branch-radius stack, pressure mode, allowance split, E12 footprint, and floor state must be used by every consumer.

The actual rowwise owners still remain to be proved. In particular, the K4 cost/defect compatibility theorem is currently a trichotomy: hypothesis-only restriction, already-owned cost/defect components, or E12 floor recomputation/transport. The final proof must choose and prove the correct mode row by row.

## 9. Conditional Assembly

Under all closed and assumed source blocks, the final assembly proceeds as follows.

1. A no-gate bad chain gives a positive final gate-excess defect on reserved inner cylinders.
2. Each positive row must be routed through the finite source alphabet.
3. Source-closed rows contribute to \(Q_k^{rep}\).
4. Gate rows exit the no-gate tail and are not inserted into \(Q_k^{rep}\).
5. Escape rows leave through genuine registered escape semantics.
6. Finite updates are paid before the final source sum begins.
7. Certified-old, atom, quotient, recurrent, or captured branches require well-founded rank.
8. Reopen and nonfinal rows are not consumed by the final theorem.
9. Once every consumed row is legally routed, repaired GQ1 and block selection rule out persistent positive defect.

This is a clean conditional reduction. It becomes a proof exactly when the remaining list below is closed.

## 10. Remaining Blocks Needed for a Nonconditional Proof

The remaining blocks are not vague. They are the actual theorem targets.

### 10.1 Zero-cost branch input

Prove actual `ZeroCostBranchInput_C` rows:

1. compactness profile;
2. strong \(L^3_{loc}\) velocity convergence;
3. strong local pressure convergence or paid pressure tails;
4. distributional Navier-Stokes limit passage;
5. vanishing full-state normal defect in the required native topology;
6. Euler-coherent branch production;
7. pressure decomposition \(P^{NS}=P^{St}+\Pi_E\);
8. carrier status;
9. cutoff/localization status;
10. gauge status;
11. no use of final regularity, final GQ1, future gate, or same-row branch capture.

### 10.2 Stokes outer data and size rows

For each accepted branch row:

1. prove packet identity between produced and consumed `StokesOuterData_C`;
2. prove outer velocity norm and pressure oscillation norm are finite recorded data;
3. prove branch force/defect is zero or source-closed, or route escape/reopen/nonfinal;
4. prove pressure convention compatibility between \(P^{NS}\), \(P^{St}\), and \(\Pi_E\);
5. prove E10 shrink and E11 margin compatibility for the chosen inner cylinder;
6. promote to `StokesBranchSize_C`;
7. promote to `PCKNBound_C`;
8. feed the result into `StokesBranchGateInputAsm_C`.

### 10.3 Relative CKN and pressure synchronization

Close actual rowwise:

1. `ZeroCostRelCKNBound_C`;
2. harmonic-tail allowance;
3. branch pressure synchronization;
4. Euler pressure switch modulus;
5. pressure-mode compatibility between Stokes pressure and active gate pressure;
6. gauge compatibility under spatial-average pressure convention;
7. no double charge of pressure/gauge/force components.

### 10.4 CKN witness rows

For every non-gated witness row, prove one legal route:

1. CW-H1 direct domination by already source-closed linear defect owners, including a kernel-null/coercivity modulus;
2. CW-H2 packet or quotient packet decomposition with a real row Bessel/Carleson estimate;
3. CW-H3 direct Carleson or monotone witness source stronger than finite energy;
4. CW-H4 compactness/rigidity gate for repeated unsourced witness;
5. CW-H5 escape, reopen, or nonfinal status.

For gated rows, prove actual gate semantics on the same reserved inner cylinder used by the final no-gate predicate.

### 10.5 S1/S4 packet source rows

Close:

1. actual packet pairing identity;
2. certified-new packet row estimates;
3. quotient packet representation inequality;
4. S1 row Bessel/Carleson theorem;
5. S4 owner-family source outcomes;
6. representation errors and packet escapes;
7. no borrowing from final GQ1 or from the source theorem being assembled.

### 10.6 S6 native force

Close:

1. forced-use or zero-certified-use exhaustion;
2. native \(Y_{force}\) transition;
3. native force-tail source closure;
4. force-owner transition;
5. Hilbert fixed-chart globalization;
6. pressure-force coupling;
7. exact owner splits with no relabeling after the final source sum.

### 10.7 S7 pressure/gauge

Close:

1. GP2 residual pressure representative variation;
2. GP3 pressure-tail production;
3. GP4 shrink/margin/floor source closure;
4. gauge-gradient;
5. gauge-cutoff;
6. gauge-shrink;
7. gauge-pair;
8. nonconstant pressure-gauge transfer ownership.

### 10.8 Shared pressure-force pair

Close source theorems for:

1. gradient representative movement;
2. pressure tail;
3. gauge representative loss;
4. gauge shrink-margin loss;
5. cutoff pressure loss;
6. fixed owner split;
7. genuine escape/gate semantics.

### 10.9 S8 cutoff/localization

Beyond the fixed dyadic cutoff Hardy subsource, close:

1. critical annular velocity mass;
2. pressure/gauge localization;
3. normal/cutoff commutators;
4. carrier imports;
5. predictor tails;
6. recentering;
7. containment;
8. cutoff/localization state motion;
9. moving-center and moving-cutoff owner compatibility.

### 10.10 S9/S10/Oseen

Close:

1. carrier source theorems;
2. Oseen moving-owner production;
3. pressure pair;
4. force/gauge pair;
5. localization-carrier-cutoff compatibility;
6. explicit Oseen errors;
7. moving-drift residuals;
8. all imported Oseen/S8 streams in the fixed parent alphabet before E12.

### 10.11 S11/S12/E12

Close:

1. shrink-margin-floor positivity;
2. exact E12 floor compatibility;
3. floor transport and lower semicontinuity;
4. raw-to-repaired comparison;
5. finite-atlas stabilization;
6. finite-variation, Cauchy, or monotone state stabilization;
7. genuine escape/gate alternatives for failed stabilization;
8. K4 cost/defect compatibility mode row by row.

### 10.12 Global residual representation and repaired GQ1

Instantiate:

1. the global residual vector \(R\);
2. transport maps \(A_k\);
3. packet witnesses \(A_k^*e_k\);
4. finite critical \(K_{crit}\) norm or an equivalent quotient packet theorem;
5. square-summable errors \(\rho_k\);
6. pressure/force/cutoff/gauge/carrier compatibility;
7. all source outcomes in the finite source contract;
8. block selection only after final repaired GQ1 is proved.

### 10.13 Final CKN assembly

Finally:

1. consume only source-closed, gated, escaped, finite-update, atom/quotient, certified-old, reopen, or nonfinal statuses;
2. exclude hidden channels, hidden escapes, unknown residuals, and late alphabet changes;
3. ensure gated rows are exits, not costs;
4. ensure reopened and nonfinal rows are not consumed;
5. derive contradiction to a persistent no-gate bad chain.

## 11. What Is Original Here

The original point is not any single classical estimate. Many local estimates are standard or standard-adjacent: CKN epsilon regularity, Stokes interior regularity, Calderon-Zygmund pressure estimates, Hardy domination, Aubin-Lions compactness, and Bessel finite-overlap arguments.

The original contribution is the way these ingredients are arranged:

1. local regularity is organized as a presentation problem with observables, fibres, predictors, costs, and legal exits;
2. finite-observation blindness is treated as a structural obstruction, not an inconvenience;
3. every proof step must carry a source status before final GQ1 may consume it;
4. zero-cost rigidity is repaired through Euler-coherent Stokes branches rather than a narrow branch classification;
5. nonlinear CKN witnesses are explicitly prevented from entering Hilbert ledgers by renaming;
6. branch gates are routed as exits, not as hidden summability theorems;
7. E12, K4, pressure, force, cutoff, carrier, packet, and witness data are all forced into a finite synchronized presentation.

This is why the strategy is more than a set of renamed standard techniques. The classical estimates remain classical; the new content is the finite proof architecture that decides when those estimates may be composed without circularity.

## 12. Reading Guide

The TeX and PDF downloads are snapshots of an earlier synchronized article. The current HTML/markdown page is the more up-to-date proof-strategy and audit view.

The useful way to read the current work is:

1. the conditional reduction is coherent and increasingly detailed;
2. many local components are genuinely closed;
3. the nonconditional theorem is not yet proved;
4. the remaining blocks are now sharply enough identified that they can be attacked one at a time.

## References

[CKN] L. Caffarelli, R. Kohn, and L. Nirenberg. Partial regularity of suitable weak solutions of the Navier-Stokes equations. Communications on Pure and Applied Mathematics, 1982.
[Leray] J. Leray. Sur le mouvement d'un liquide visqueux emplissant l'espace. Acta Mathematica, 1934.
[Serrin] J. Serrin. The initial value problem for the Navier-Stokes equations. Nonlinear Problems, 1963.
[Lin] F.-H. Lin. A new proof of the Caffarelli-Kohn-Nirenberg theorem. Communications on Pure and Applied Mathematics, 1998.
